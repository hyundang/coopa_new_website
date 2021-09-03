import styled from "styled-components";

export interface EmptyProps {
  id?: string;
  className?: string;
  img: string;
  imgWidth: number;
  text?: string;
  text2?: string;
  Btn?: React.ReactNode;
}
const Empty = ({
  id,
  className,
  img,
  imgWidth,
  text,
  text2,
  Btn,
}: EmptyProps) => {
  return (
    <EmptyWrap id={id} className={className}>
      <img
        alt="content-img"
        className="content__img"
        src={img}
        style={{ width: imgWidth }}
      />
      <h1 className="content__text">{text}</h1>
      <h2 className="content__text--small">{text2}</h2>
      <div className="space" />
      {Btn}
    </EmptyWrap>
  );
};

export default Empty;

const EmptyWrap = styled.div`
  width: 100%;
  padding-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1,
  h2 {
    margin: 0;
  }

  .content__img {
    margin-bottom: 24px;
  }
  .content__text {
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    color: var(--gray_5);
  }
  .content__text--small {
    margin-top: 2px;
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
    color: var(--gray_5);
  }
  .space {
    height: 26px;
  }
`;
