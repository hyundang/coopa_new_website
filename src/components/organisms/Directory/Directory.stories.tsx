import { mockDirModule } from "@data/dummy/directory";
import Directory from ".";

export default {
  title: "components/organisms/Directory",
  component: Directory,
};

export const directory = () => {
  return (
    <div style={{ width: "270px" }}>
      <Directory
        dir={{
          isPinned: true,
          emoji: "😀",
          id: 2543,
          name: "디렉토리디렉토리디렉토리디렉토리디렉토리디렉토리",
          thumbnail: "https://www.notion.so/images/meta/default.png",
          cookieCnt: 1,
        }}
        dirModule={mockDirModule}
        refreshCookie={async () => {}}
      />
    </div>
  );
};

directory.story = {
  name: "Default",
};
