import { useState } from "react";
import styled from "styled-components";
import Tab from "./Tab";

export default {
  title: "components/atoms/Tab",
  component: Tab,
};

export const tab = () => {
  const [value, setValue] = useState("모든 쿠키");
  return (
    <ContentNav className="content_nav">
      <div className="content_nav_innder">
        <Tab
          tabStyle={{
            width: "106px",
            height: "56px",
            fontSize: "16px",
          }}
          options={["모든 쿠키", "디렉토리"]}
          value={value}
          setValue={setValue}
        />
      </div>
    </ContentNav>
  );
};

tab.story = {
  name: "Detfault",
};

const ContentNav = styled.nav`
  width: 100%;
  padding-bottom: 1px;
  border-bottom: 1px solid var(--gray_3);

  .content_nav_inner {
    /* 반응형 */
  }
`;

export const modalTab = () => {
  const [value, setValue] = useState("기본 테마");
  return (
    <ContentNav className="content_nav">
      <div className="content_nav_innder">
        <Tab
          tabStyle={{
            width: "68px",
            height: "48px",
            fontSize: "13px",
          }}
          options={["기본 테마", "업로드"]}
          value={value}
          setValue={setValue}
        />
      </div>
    </ContentNav>
  );
};
