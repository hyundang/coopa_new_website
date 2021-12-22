import useSWR, { mutate } from "swr";
import reactCookie from "react-cookies";
import { Dispatch, SetStateAction, useState } from "react";
import {
  DirectoryDataProps,
  GetDirectoryDataProps,
  PostDirectoryProps,
} from "@interfaces/directory";
import { ToastMsgVisibleStateProps } from "@interfaces/toastMsg";
import getApi from "@api/getApi";
import delApi from "@api/delApi";
import putApi from "@api/putApi";
import postApi from "@api/postApi";
import { returnDirFilter } from "@lib/filter";

interface DirModuleProps {
  /** initial directory datas */
  initAllDirData: GetDirectoryDataProps;
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

  // 모든 디렉토리 데이터 get
  const { data: allDirData } = useSWR(
    () => `/directories?filter=${returnDirFilter(dirFilter)}`,
    getApi.getAllDirData,
    {
      initialData: initAllDirData,
      errorRetryCount: 3,
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
      async (prev: GetDirectoryDataProps) => {
        const res = await postApi.postDirectoryData(newValue);
        const newDir: DirectoryDataProps = {
          emoji: res?.emoji,
          id: res?.directoryId || -1,
          name: res?.name || "",
          cookieCnt: 0,
        };
        return { common: [...(prev?.common || []), newDir] };
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
      async (prev: GetDirectoryDataProps) => {
        const res = await delApi.delDirData(dirId);
        let newCommon;
        if (prev)
          newCommon = prev.common.filter((dir) => dir.id !== res?.directoryId);
        else
          newCommon = initAllDirData.common.filter(
            (dir) => dir.id !== res?.directoryId,
          );
        return {
          common: newCommon,
        };
      },
      false,
    );
    // toast msg
    setIsVisible({
      ...isVisible,
      dirDel: true,
    });
  };

  // 디렉토리 edit
  const handleEditDir = async (id: number, body: PostDirectoryProps) => {
    mutate(
      `/directories?filter=${returnDirFilter(dirFilter)}`,
      async (prev: GetDirectoryDataProps) => {
        const res = await putApi.updateDirectoryData(id, body);

        // 갱신된 데이터일 때
        if (prev) {
          let newCommon;
          // 최신순
          if (dirFilter === "latest") {
            newCommon = [res, ...prev.common.filter((dir) => dir.id !== id)];
          }
          // 오래된순
          if (dirFilter === "oldest") {
            newCommon = [...prev.common.filter((dir) => dir.id !== id), res];
          }
          // 가나다순
          if (dirFilter === "abc") {
            newCommon = prev.common.map((dir) => {
              if (dir.id === id)
                return {
                  ...dir,
                  name: res.name,
                  emoji: res.emoji,
                };
              return dir;
            });
          }

          return {
            common: newCommon,
          };
        }

        // 초기 데이터일 때
        let newCommon;
        if (dirFilter === "latest") {
          newCommon = [
            res,
            ...initAllDirData.common.filter((dir) => dir.id !== id),
          ];
        }
        // 오래된순
        if (dirFilter === "oldest") {
          newCommon = [
            ...initAllDirData.common.filter((dir) => dir.id !== id),
            res,
          ];
        }
        // 가나다순
        if (dirFilter === "abc") {
          newCommon = initAllDirData.common.map((dir) => {
            if (dir.id === id)
              return {
                ...dir,
                name: res.name,
                emoji: res.emoji,
              };
            return dir;
          });
        }

        return {
          common: newCommon,
        };
      },
      false,
    );
    // toast msg
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
