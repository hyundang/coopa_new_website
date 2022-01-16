// apis
import { getApi, delApi, postApi, putApi } from "@api/index";
// interfaces
import {
  DirDataProps,
  GetAllDirProps,
  CreateDirProps,
} from "@interfaces/directory";
// libs
import useSWR from "swr";
import reactCookie from "react-cookies";
import { useState } from "react";
import { returnDirFilter } from "@lib/filter";
import { useRecoilState } from "recoil";
import SaveDataInWebCookie from "@lib/SaveDataInWebCookie";
// modules
import { ToastMsgState } from "./states";

interface DirModuleProps {
  /** initial directory datas */
  initAllDirData: GetAllDirProps;
}
const DirModule = ({ initAllDirData }: DirModuleProps) => {
  // toast msg
  const [isToastMsgVisible, setIsToastMsgVisible] =
    useRecoilState(ToastMsgState);
  // 디렉토리 필터
  const initFilter = reactCookie.load("dirFilter");
  const [dirFilter, setDirFilter] = useState<"latest" | "oldest" | "abc">(
    initFilter || "latest",
  );
  // 고정 디렉토리
  const [pinnedDirData, setPinnedDirData] = useState<DirDataProps[]>(
    initAllDirData.pinned || [],
  );
  // 고정 안 된 디렉토리
  const [unpinnedDirData, setUnpinnedDirData] = useState<DirDataProps[]>(
    initAllDirData.common,
  );

  // 모든 디렉토리 데이터 get
  const { data: allDirData, mutate: allDirMutate } = useSWR(
    () => `/directories?filter=${returnDirFilter(dirFilter)}`,
    getApi.getAllDirData,
    {
      initialData: initAllDirData,
      errorRetryCount: 3,
      onSuccess: (data) => {
        setPinnedDirData(data?.pinned || []);
        setUnpinnedDirData(data?.common || []);
      },
    },
  );

  // 디렉토리 필터 변경
  const updateAndSaveDirFilter = (
    filter: "latest" | "readMost" | "readLeast" | "oldest" | "abc",
  ) => {
    filter !== "readMost" && filter !== "readLeast" && setDirFilter(filter);
    SaveDataInWebCookie("dirFilter", filter);
  };

  // 검색된 디렉토리 데이터 get
  const { data: searchedDirData } = useSWR(
    "/directories/search",
    getApi.getSearchedDirData,
    { revalidateOnFocus: false, revalidateOnMount: false },
  );

  // 디렉토리 post
  const createDir = async (newValue: CreateDirProps) => {
    mutate(
      `/directories?filter=${returnDirFilter(dirFilter)}`,
      async (prev: GetAllDirProps) => {
        const res = await postApi.postDirectoryData(newValue);
        const newDir: DirDataProps = {
          emoji: res?.emoji,
          id: res?.directoryId || -1,
          name: res?.name || "",
          cookieCnt: 0,
          isPinned: false,
        };
        return { common: [...(prev?.common || []), newDir] };
      },
      true,
    );
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      dirCreate: true,
    });
  };

  // 디렉토리 delete
  const deleteDir = async (dirId: number) => {
    mutate(
      `/directories?filter=${returnDirFilter(dirFilter)}`,
      async (prev: GetAllDirProps) => {
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
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      dirDel: true,
    });
  };

  // 디렉토리 edit
  const updateDir = async (id: number, body: CreateDirProps) => {
    mutate(
      `/directories?filter=${returnDirFilter(dirFilter)}`,
      async (prev: GetAllDirProps) => {
        const res = await putApi.updateDirectoryData(id, body);

        // 갱신된 데이터일 때
        if (prev) {
          let newCommon;
          let newPinned;
          // 최신순
          if (dirFilter === "latest") {
            if (res.isPinned) {
              newCommon = [
                res,
                ...(prev.pinned?.filter((dir) => dir.id !== id) || []),
                ...prev.common,
              ];
            } else {
              newCommon = [
                ...(prev.pinned || []),
                res,
                ...prev.common.filter((dir) => dir.id !== id),
              ];
            }
          }
          // 오래된순
          if (dirFilter === "oldest") {
            if (res.isPinned) {
              newCommon = [
                ...(prev.pinned?.filter((dir) => dir.id !== id) || []),
                res,
                ...prev.common,
              ];
            } else {
              newCommon = [
                ...(prev.pinned || []),
                ...prev.common.filter((dir) => dir.id !== id),
                res,
              ];
            }
            newCommon = [...prev.common.filter((dir) => dir.id !== id), res];
          }
          // 가나다순
          if (dirFilter === "abc") {
            if (res.isPinned) {
              newCommon = prev.pinned?.map((dir) => {
                if (dir.id === id)
                  return {
                    ...dir,
                    name: res.name,
                    emoji: res.emoji,
                  };
                return dir;
              });
            } else {
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
          }

          if (res.isPinned) return { pinned: newPinned, common: prev.common };
          return { pinned: prev.pinned, common: newCommon };
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
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      dirEdit: true,
    });
  };

  // 디렉토리 pin
  const updateDirPin = async (id: number, isPinned: boolean) => {
    const res = await putApi.updateDirectoryPin(id, isPinned);
    mutate(`/directories?filter=${returnDirFilter(dirFilter)}`, true);
  };

  return {
    dirFilter,
    updateAndSaveDirFilter,
    pinnedDirData,
    unpinnedDirData,
    searchedDirData,
    createDir,
    deleteDir,
    updateDir,
    updateDirPin,
  };
};

export default DirModule;
