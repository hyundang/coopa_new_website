// apis
import { getApi, delApi, putApi, postApi } from "@api/index";
// interfaces
import { CreateDirProps, SimpleDirDataProps } from "@interfaces/directory";
// libs
import useSWR from "swr";
import { useRecoilState } from "recoil";
// modules
import { ToastMsgState } from "./states";

interface DirDetailModuleProps {
  dirId: number;
  initDirInfoData: SimpleDirDataProps;
}
const DirDetailModule = ({ dirId, initDirInfoData }: DirDetailModuleProps) => {
  // toast msg
  const [isToastMsgVisible, setIsToastMsgVisible] =
    useRecoilState(ToastMsgState);

  // 디렉토리 데이터 get
  const {
    data: dirInfo,
    error: dirInfoError,
    mutate: dirMutate,
  } = useSWR(`/directories/${dirId}/info`, getApi.getDirInfo, {
    initialData: initDirInfoData,
    errorRetryCount: 3, // 재시도 3번까지만
  });

  // 디렉토리 delete
  const deleteDir = async () => {
    const res = await delApi.delDirData(dirId);
    if (res) {
      window.open(DOMAIN, "_self");
      return;
    }
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      dirDelError: true,
    });
  };

  // 디렉토리 edit
  const editDir = async (id: number, body: CreateDirProps) => {
    const res = await putApi.updateDirectoryData(id, body);
    if (res) {
      dirMutate(() => {
        return {
          id: res.id || -1,
          emoji: res.emoji,
          name: res.name,
        };
      }, false);
      setIsToastMsgVisible({
        ...isToastMsgVisible,
        dirEdit: true,
      });
      return;
    }
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      dirEditError: true,
    });
  };

  // 디렉토리 공유 링크 생성
  const getShareLink = async () => {
    const shareToken = await postApi.postShareToken(dirId);
    return `${DOMAIN}/share/${shareToken}`;
  };

  return {
    dirInfo,
    deleteDir,
    editDir,
    getShareLink,
    isError: dirInfoError,
    isLoading: !dirInfo && !dirInfoError,
  };
};

export default DirDetailModule;
