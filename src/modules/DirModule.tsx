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
  const [dirFilter, setDirFilter] = useState<"latest" | "oldest" | "abc">(
    "latest",
  );

  // 디렉토리 필터 변경
  const handleDirFilter = (
    filter: "latest" | "readMost" | "readLeast" | "oldest" | "abc",
  ) => {
    filter !== "readMost" && filter !== "readLeast" && setDirFilter(filter);
    reactCookie.save("dirFilter", filter, {
      path: "/",
      httpOnly: JSON.parse(HTTP_ONLY),
    });
    switch (filter) {
      case "latest":
        setFilteredDirData(allDirData && [...allDirData].sort(idCountDesc));
        break;
      case "oldest":
        setFilteredDirData(allDirData && [...allDirData].sort(idCountAsc));
        break;
      default:
        setFilteredDirData(allDirData);
        break;
    }
  };

  // 모든 디렉토리 데이터 get
  const { data: allDirData } = useSWR("/directories", getApi.getAllDirData, {
    initialData: initAllDirData,
    onErrorRetry: ({ retryCount }) => {
      // 3번 까지만 재시도함
      if (retryCount >= 3) return undefined;
      return true;
    },
    onSuccess: (data) => {
      const filter = reactCookie.load("dirFilter");
      if (data && filter !== null) {
        switch (filter) {
          case "latest":
            setDirFilter("latest");
            setFilteredDirData([...data].sort(idCountDesc));
            break;
          case "oldest":
            setDirFilter("oldest");
            setFilteredDirData([...data].sort(idCountAsc));
            break;
          default:
            setDirFilter("abc");
            setFilteredDirData(data);
            break;
        }
      } else if (data && filter === null) {
        setDirFilter("abc");
        setFilteredDirData([...data]);
      }
    },
  });

  // 필터링 된 디렉토리 데이터 get
  const [filteredDirData, setFilteredDirData] = useState<
    DirectoryDataProps[] | undefined
  >(initAllDirData);

  // 검색된 디렉토리 데이터 get
  const { data: searchedDirData } = useSWR(
    "/directories/search",
    getApi.getSearchedDirData,
    { revalidateOnFocus: false, revalidateOnMount: false },
  );

  // 디렉토리 post
  const handlePostDir = async (newValue: PostDirectoryProps) => {
    const res = await postApi.postDirectoryData(newValue);
    res &&
      (() => {
        mutate(
          "/directories",
          () => {
            const newDirList: DirectoryDataProps = {
              emoji: res.emoji,
              id: res.directoryId,
              name: res.name,
              cookieCnt: 0,
            };
            setFilteredDirData((prev) => prev?.concat(newDirList));
          },
          false,
        );
        setIsVisible({
          ...isVisible,
          dirCreate: true,
        });
      })();
  };

  // 디렉토리 delete
  const handleDelDir = async (dirId: number) => {
    const res = await delApi.delDirData(dirId);
    res &&
      (() => {
        mutate(
          "/directories",
          setFilteredDirData((prev) =>
            prev?.filter((dir) => dir.id !== res.id),
          ),
          false,
        );
        setIsVisible({
          ...isVisible,
          dirDel: true,
        });
      })();
  };

  // 디렉토리 edit
  const handleEditDir = async (id: number, body: PostDirectoryProps) => {
    const res = await putApi.updateDirectoryData(id, body);
    res &&
      (() => {
        mutate(
          "/directories",
          setFilteredDirData((prev) =>
            prev?.map((dir) => {
              if (dir.id === id) {
                return {
                  ...dir,
                  name: body.name || "",
                  emoji: body.emoji || "",
                };
              }
              return dir;
            }),
          ),
          false,
        );
        setIsVisible({
          ...isVisible,
          dirEdit: true,
        });
      })();
  };

  return {
    dirFilter,
    handleDirFilter,
    allDirData,
    filteredDirData,
    searchedDirData,
    handlePostDir,
    handleDelDir,
    handleEditDir,
  };
};

export default DirModule;
