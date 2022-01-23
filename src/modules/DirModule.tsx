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
  const initDirFilter = reactCookie.load("dirFilter");
  const [dirFilter, setDirFilter] = useState<"latest" | "oldest" | "abc">(
    initDirFilter || "latest",
  );
  // 고정 디렉토리
  const [pinnedDirData, setPinnedDirData] = useState<DirDataProps[]>(
    initAllDirData.pinned || [],
  );
  // 고정 안 된 디렉토리
  const [unpinnedDirData, setUnpinnedDirData] = useState<DirDataProps[]>(
    initAllDirData.common,
  );

  // // 모든 디렉토리 데이터 get
  // const { data: allDirData } = useSWR(
  //   () => `/directories?filter=${returnDirFilter(dirFilter)}`,
  //   getApi.getAllDirData,
  //   {
  //     initialData: initAllDirData,
  //     errorRetryCount: 3,
  //     onSuccess: (data) => {
  //       setPinnedDirData(data?.pinned || []);
  //       setUnpinnedDirData(data?.common || []);
  //     },
  //   },
  // );

  // 디렉토리 필터 변경
  const updateAndSaveDirFilter = (
    filter: "latest" | "readMost" | "readLeast" | "oldest" | "abc",
  ) => {
    filter !== "readMost" && filter !== "readLeast" && setDirFilter(filter);
    SaveDataInWebCookie("dirFilter", filter);
  };

  // 검색된 디렉토리 데이터 get
  const { data: searchedDirData, mutate: searchedMutate } = useSWR(
    "/directories/search",
    getApi.getSearchedDirData,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      shouldRetryOnError: false,
    },
  );

  const filterSpecificDirInDirList = (
    dirList: DirDataProps[],
    dirId: number,
  ): DirDataProps[] => {
    return dirList.filter((dir) => dir.id !== dirId);
  };

  const changeSequenceOfSpecificDirInDirList = (
    dirList: DirDataProps[],
    dirData: DirDataProps,
  ): DirDataProps[] => {
    switch (dirFilter) {
      case "latest":
        return [dirData, ...filterSpecificDirInDirList(dirList, dirData.id)];
      case "oldest":
        return [...filterSpecificDirInDirList(dirList, dirData.id), dirData];
      default:
        return changeDataOfSpecificDirInDirList(dirList, dirData);
    }
  };

  const changeDataOfSpecificDirInDirList = (
    dirList: DirDataProps[],
    dirData: DirDataProps,
  ): DirDataProps[] => {
    return dirList.map((dir) => {
      if (dir.id === dirData.id) {
        return dirData;
      }
      return dir;
    });
  };

  // 디렉토리 생성
  const createDir = async (newDirData: CreateDirProps): Promise<number> => {
    const res = await postApi.postDirectoryData(newDirData);
    if (res) {
      const newDir: DirDataProps = {
        emoji: res.emoji,
        id: res.directoryId,
        name: res.name,
        cookieCnt: 0,
        isPinned: false,
      };
      setUnpinnedDirData(
        changeSequenceOfSpecificDirInDirList(unpinnedDirData, newDir),
      );
      setIsToastMsgVisible({
        ...isToastMsgVisible,
        dirCreate: true,
      });
      return res.directoryId;
    }
    alert("디렉토리 생성 실패!");
    return -1;
  };

  // 디렉토리 삭제
  const deleteDir = async (
    dirId: number,
    isPinned: boolean,
    isSearched: boolean,
  ) => {
    const res = await delApi.delDirData(dirId);
    if (res) {
      if (isPinned)
        setPinnedDirData(filterSpecificDirInDirList(pinnedDirData, dirId));
      else if (isSearched)
        searchedMutate(async (dirList) =>
          filterSpecificDirInDirList(dirList || [], dirId),
        );
      else
        setUnpinnedDirData(filterSpecificDirInDirList(unpinnedDirData, dirId));
      setIsToastMsgVisible({
        ...isToastMsgVisible,
        dirDel: true,
      });
      return;
    }
    alert("디렉토리 삭제 실패!");
  };

  // 디렉토리 edit
  const updateDir = async (
    id: number,
    body: CreateDirProps,
    isPinned: boolean,
    isSearched: boolean,
  ) => {
    const res = await putApi.updateDirectoryData(id, body);
    if (res) {
      if (isPinned)
        setPinnedDirData(
          changeSequenceOfSpecificDirInDirList(pinnedDirData, res),
        );
      else if (isSearched)
        searchedMutate(async (dirList) =>
          changeDataOfSpecificDirInDirList(dirList || [], res),
        );
      else
        setUnpinnedDirData(
          changeSequenceOfSpecificDirInDirList(unpinnedDirData, res),
        );
      setIsToastMsgVisible({
        ...isToastMsgVisible,
        dirEdit: true,
      });
      return;
    }
    alert("디렉토리 수정 실패!");
  };

  // 디렉토리 pin
  const updateDirPin = async (
    dirId: number,
    isPinned: boolean,
    isSearched: boolean,
  ) => {
    const res = await putApi.updateDirectoryPin(dirId, !isPinned);
    if (res) {
      if (!isPinned) {
        setPinnedDirData(
          changeSequenceOfSpecificDirInDirList(pinnedDirData, res),
        );
        setUnpinnedDirData(filterSpecificDirInDirList(unpinnedDirData, dirId));
      } else if (isSearched) {
        searchedMutate(async (dirList) =>
          changeDataOfSpecificDirInDirList(dirList || [], res),
        );
      } else {
        setPinnedDirData(filterSpecificDirInDirList(pinnedDirData, dirId));
        setUnpinnedDirData(
          changeSequenceOfSpecificDirInDirList(unpinnedDirData, res),
        );
      }
      return;
    }
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      pinnedSizeOver: true,
    });
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
