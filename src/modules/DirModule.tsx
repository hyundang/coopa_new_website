import useSWR, { mutate } from "swr";
import reactCookie from "react-cookies";
import { Dispatch, SetStateAction, useState } from "react";
import { idCountAsc, idCountDesc } from "@lib/filter";
import { DirectoryDataProps, PostDirectoryProps } from "@interfaces/directory";
import { ToastMsgVisibleStateProps } from "@interfaces/toastMsg";
import getApi from "@api/getApi";
import delApi from "@api/delApi";
import putApi from "@api/putApi";
import postApi from "@api/postApi";

interface DirModuleProps {
  /** initial directory datas */
  initAllDirData: DirectoryDataProps[];
  /** toast msg */
  isVisible: ToastMsgVisibleStateProps;
  setIsVisible: Dispatch<SetStateAction<ToastMsgVisibleStateProps>>;
}
const DirModule = ({
  initAllDirData,
  isVisible,
  setIsVisible,
}: DirModuleProps) => {
  // 디렉토리 필터
  const initFilter = reactCookie.load("dirFilter");
  const [dirFilter, setDirFilter] = useState<"latest" | "oldest" | "abc">(
    initFilter || "latest",
  );

  const returnDirFilter = (filterType: "latest" | "oldest" | "abc") => {
    if (filterType === "oldest") return 1;
    if (filterType === "latest") return 2;
    return 0;
  };

  // 모든 디렉토리 데이터 get
  const { data: allDirData } = useSWR(
    () => `/directories?filter=${returnDirFilter(dirFilter)}`,
    getApi.getAllDirData,
    {
      initialData: initAllDirData,
      onErrorRetry: ({ retryCount }) => {
        // 3번 까지만 재시도함
        if (retryCount >= 3) return undefined;
        return true;
      },
    },
  );

  // 디렉토리 필터 변경
  const handleDirFilter = (
    filter: "latest" | "readMost" | "readLeast" | "oldest" | "abc",
  ) => {
    filter !== "readMost" && filter !== "readLeast" && setDirFilter(filter);
    // 만료일 설정, 쿠키 저장
    const expires = new Date();
    expires.setFullYear(
      expires.getFullYear() + Number(process.env.EXPIRE_YEAR),
    );
    reactCookie.save("dirFilter", filter, {
      path: "/",
      expires,
      httpOnly: JSON.parse(HTTP_ONLY),
    });
    // 필터에 따라 디렉토리 데이터 정렬
    filter !== "readLeast" &&
      filter !== "readMost" &&
      mutate(`/directories?filter=${returnDirFilter(dirFilter)}`);
  };

  // 검색된 디렉토리 데이터 get
  const { data: searchedDirData } = useSWR(
    "/directories/search",
    getApi.getSearchedDirData,
    { revalidateOnFocus: false, revalidateOnMount: false },
  );

  // 디렉토리 post
  const handlePostDir = async (newValue: PostDirectoryProps) => {
    mutate(
      `/directories?filter=${returnDirFilter(dirFilter)}`,
      async (prev: DirectoryDataProps[]) => {
        const res = await postApi.postDirectoryData(newValue);
        const newDir: DirectoryDataProps = {
          emoji: res?.emoji,
          id: res?.directoryId || -1,
          name: res?.name || "",
          cookieCnt: 0,
        };
        return [...prev, newDir];
      },
      true,
    );
    setIsVisible({
      ...isVisible,
      dirCreate: true,
    });
  };

  // 디렉토리 delete
  const handleDelDir = async (dirId: number) => {
    mutate(
      `/directories?filter=${returnDirFilter(dirFilter)}`,
      async (prev: DirectoryDataProps[]) => {
        const res = await delApi.delDirData(dirId);
        if (prev) return prev.filter((dir) => dir.id !== res?.directoryId);
        return initAllDirData.filter((dir) => dir.id !== res?.directoryId);
      },
      false,
    );
    setIsVisible({
      ...isVisible,
      dirDel: true,
    });
  };

  // 디렉토리 edit
  const handleEditDir = async (id: number, body: PostDirectoryProps) => {
    mutate(
      `/directories?filter=${returnDirFilter(dirFilter)}`,
      async (prev: DirectoryDataProps[]) => {
        await putApi.updateDirectoryData(id, body);
        if (prev) {
          return prev.map((dir) => {
            if (dir.id === id) {
              return {
                ...dir,
                name: body.name || "",
                emoji: body.emoji || "",
              };
            }
            return dir;
          });
        }
        return initAllDirData.map((dir) => {
          if (dir.id === id) {
            return {
              ...dir,
              name: body.name || "",
              emoji: body.emoji || "",
            };
          }
          return dir;
        });
      },
      true,
    );
    setIsVisible({
      ...isVisible,
      dirEdit: true,
    });
  };

  return {
    dirFilter,
    handleDirFilter,
    allDirData,
    searchedDirData,
    handlePostDir,
    handleDelDir,
    handleEditDir,
  };
};

export default DirModule;
