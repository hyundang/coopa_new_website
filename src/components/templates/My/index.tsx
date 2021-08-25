import { GoogleIcon } from "@assets/icons/btn";
import { EditIcon } from "@assets/icons/common";
import { TooltipIcon } from "@assets/icons/mypage";
import {
  CountDuribunHandImg,
  CountDuribunHeadImg,
  LogoutDuribunImg,
} from "@assets/imgs/mypage";
import { mypageAnimation } from "@components/animations";
import { Btn, Bubble, Icon, ToastMsg } from "@components/atoms";
import { Footer, Header, ProfileEditModal } from "@components/organisms";
import { EditUserDataProps, UserDataProps } from "@interfaces/user";
import { Dispatch, SetStateAction, useState } from "react";
import { useWindowSize } from "src/hooks";
import styled, { css } from "styled-components";

export interface MyProps {
  userData: UserDataProps;
  /** 로그아웃 버튼 클릭 이벤트 핸들러 */
  onClickLogout: React.MouseEventHandler<HTMLButtonElement>;
  /** 프로필 수정 버튼 클릭 이벤트 핸들러 */
  editProfile: () => void;
  /** 프로필 수정 데이터 */
  profileData: EditUserDataProps;
  setProfileData: Dispatch<SetStateAction<EditUserDataProps>>;
  /** 프로필 수정 모달 오픈 */
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const My = ({
  userData,
  onClickLogout,
  editProfile,
  profileData,
  setProfileData,
  isOpen,
  setIsOpen,
}: MyProps) => {
  const size = useWindowSize();
  const [isTooltipHover, setIsTooltipHover] = useState(false);
  const [isLogoutHover, setIsLogoutHover] = useState(false);
  // toast msg visible state
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Container>
      <Header imgUrl={userData.profileImage} isMypage />
      <MyCntnr
        imgUrl={userData.profileImage}
        isLogoutHover={isLogoutHover}
        width={size.width}
      >
        <main className="user-info">
          <section className="profile">
            <div className="profile__img" role="img" />
            <div className="profile__info">
              <div className="name-wrap">
                <h1 className="name">{userData.name}</h1>
                <Icon className="edit-button" onClick={() => setIsOpen(true)}>
                  <EditIcon className="edit-icon" />
                </Icon>
              </div>
              <h3 className="introduction">
                {userData.introduction || "나만의 한 줄 소개를 입력해주세요"}
              </h3>
            </div>
          </section>
          <section className="cookie">
            <img
              src={CountDuribunHeadImg}
              alt="count_duribun_head"
              className="count-img-head"
            />
            <img
              src={CountDuribunHandImg}
              alt="count_duribun_hand"
              className="count-img-hand"
            />
            <div className="cookie-count">
              👏 지금까지 쿠키
              {userData.allCookies > 9999 ? (
                <AllCookieNumWrap width={5}>
                  <AllCookieNum num={9999} isOver />
                </AllCookieNumWrap>
              ) : (
                <AllCookieNumWrap width={String(userData.allCookies).length}>
                  <AllCookieNum num={userData.allCookies} />
                </AllCookieNumWrap>
              )}
              개를 파킹했고
              {userData.readCount > 9999 ? (
                <ReadCookieNumWrap width={5}>
                  <ReadCookieNum num={9999} isOver />
                </ReadCookieNumWrap>
              ) : (
                <ReadCookieNumWrap width={String(userData.readCount).length}>
                  <ReadCookieNum num={userData.readCount} />
                </ReadCookieNumWrap>
              )}
              번 읽었어요!
            </div>
          </section>
        </main>
        <Info className="account" title="계정 설정">
          <div className="account-item">
            <span className="account-item__text">이메일</span>
            <div className="account-item__email">
              <div className="email-div">
                <span className="email-div__text">{userData.email}</span>
                <Icon className="email-div__icon">
                  <GoogleIcon className="google-icon" />
                </Icon>
              </div>
              <span className="email-desc">구글 계정으로 로그인 중이에요!</span>
            </div>
          </div>
        </Info>
        <StyledBubble isHover={isTooltipHover}>
          🔧 ️크롬 우측 상단 아이콘 우클릭 - 옵션 - 토글버튼 ON/OFF로 변경할 수
          있어요
        </StyledBubble>
        <Info className="setting" title="환경 설정">
          <div className="setting-item">
            <span className="setting-how">
              <span className="setting-how__text">새 탭에서 열기</span>
              <Icon
                className="setting-how__icon"
                setIsHover={setIsTooltipHover}
              >
                <TooltipIcon className="tooltip-icon" role="img" />
              </Icon>
            </span>
            <span className="setting-item__desc">
              매일 새 탭을 열 때마다 쿠키파킹과 함께하세요!
            </span>
          </div>
        </Info>
        <Info className="service" title="서비스 정보">
          <div className="service-item">
            <a
              className="service-item__link"
              href="https://forms.gle/fo4oSB3U2DE5EMNK6"
              target="_blank"
              rel="noreferrer"
            >
              쿠키파킹 피드백
            </a>
            <a
              className="service-item__link"
              href="https://www.notion.so/6b6fb48a08ac41118914bd57e55bbc4d"
              target="_blank"
              rel="noreferrer"
            >
              개인정보보호 정책
            </a>
            <span className="service-item__link--disabled">
              제휴 및 광고 문의
            </span>
          </div>
        </Info>
        <div className="button-wrap">
          <span className="logout">
            <img
              src={LogoutDuribunImg}
              alt="logout-img"
              className="logout__img"
              id="logout-img"
            />
            <Btn
              className="logout__button"
              isAtvBtn
              onClick={onClickLogout}
              setIsHover={setIsLogoutHover}
            >
              로그아웃
            </Btn>
          </span>
        </div>
      </MyCntnr>
      <Footer />
      <ProfileEditModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        value={profileData}
        setValue={setProfileData}
        editProfile={editProfile}
      />
      <ToastMsg isVisible={isVisible} setIsVisible={setIsVisible}>
        👀 프로필을 수정했어요!
      </ToastMsg>
    </Container>
  );
};

export default My;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface MyCntnrProps {
  imgUrl?: string;
  isLogoutHover: boolean;
  width?: number;
}
const MyCntnr = styled.section<MyCntnrProps>`
  width: 840px;
  margin-top: 116px;
  .user-info {
    margin-bottom: 16px;
    .profile {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      &__img {
        width: 152px;
        height: 152px;
        margin-right: 41px;
        border-radius: 76px;
        border: 2px solid var(--gray_4);
        background: url(${({ imgUrl }) => imgUrl}) center center/cover;
      }
      &__info {
        .name-wrap {
          margin-bottom: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          .name {
            width: auto;
            margin: 0;
            margin-right: 10px;
            font-size: 28px;
            color: var(--black_2);
          }
          .edit-button {
            width: 44px;
            height: 44px;
            border-radius: 22px;
            @media (hover: hover) {
              &:hover {
                background-color: var(--gray_hover_1);
              }
            }
            .edit-icon {
              width: 28px;
              height: 28px;
              path {
                fill: var(--black_1);
              }
            }
          }
        }
        .introduction {
          width: 511px;
          height: 48px;
          margin: 0;
          font-size: 15px;
          font-weight: 400;
          line-height: 24px;
          color: var(--gray_6);
        }
      }
    }
  }

  .cookie {
    width: 100%;
    margin-bottom: 72px;
    .count-img-head {
      position: relative;
      z-index: 0;
      top: 10px;
      left: 700px;
      animation: ${mypageAnimation.countDuribunHeadRule};
    }
    .count-img-hand {
      position: relative;
      z-index: 2;
      top: 10px;
      left: 628px;
      animation: ${mypageAnimation.countDuribunHandRule};
    }
    .cookie-count {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 132px;
      border-radius: 20px;
      background-color: var(--gray_1);
      font-weight: 500;
      font-size: 20px;
      line-height: 25px;
      color: var(--black_1);
    }
  }

  .account {
    margin-bottom: 63px;
    .account-item {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      &__text {
        font-size: 18px;
        line-height: 23px;
        color: var(--gray_7);
      }
      &__email {
        display: flex;
        flex-direction: column;
        .email-div {
          width: 506px;
          height: 56px;
          padding: 18px 9px 18px 24px;
          border-radius: 12px;
          background-color: var(--gray_2);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          &__text {
            font-weight: 500;
            font-size: 17px;
            line-height: 21px;
            color: var(--gray_5);
          }
          &__icon {
            cursor: default;
            width: 38px;
            height: 38px;
            border-radius: 8px;
            background-color: var(--white);
          }
        }
        .email-desc {
          margin-top: 12px;
          margin-left: 13px;
          font-size: 14px;
          line-height: 18px;
          color: var(--gray_6);
        }
      }
    }
  }

  .setting {
    margin-bottom: 83px;
    .setting-item {
      margin-top: 32px;
      .setting-how {
        margin-bottom: 12px;
        display: flex;
        flex-direction: row;
        align-items: center;
        &__text {
          font-size: 18px;
          line-height: 23px;
          color: var(--gray_7);
        }
        &__icon {
          width: 32px;
          height: 32px;
          border-radius: 16px;
          &:hover {
            background-color: var(--gray_hover_1);
            .tooltip-icon {
              path {
                fill: var(--black_2);
              }
              circle {
                stroke: var(--black_2);
              }
            }
          }
        }
      }
      &__desc {
        font-size: 15px;
        line-height: 19px;
        color: var(--gray_5);
      }
    }
  }

  .service {
    margin-bottom: 74px;
    .service-item {
      position: relative;
      margin-top: 26px;
      left: -13px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      &__link {
        cursor: pointer;
        text-decoration: none;
        width: fit-content;
        padding: 12px 13px;
        font-size: 18px;
        font-weight: 400;
        line-height: 23px;
        color: var(--gray_7);
      }
      &__link--disabled {
        padding: 12px 13px;
        font-size: 18px;
        font-weight: 400;
        line-height: 23px;
        color: var(--gray_4);
      }
    }
  }

  .button-wrap {
    width: 100%;
    margin-bottom: 140px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .logout {
      display: flex;
      flex-direction: column;
      &__img {
        position: relative;
        z-index: 0;
        left: 53px;
        top: 14px;
        width: 64px;
        ${({ isLogoutHover }) =>
          isLogoutHover
            ? css`
                opacity: 1;
                visibility: visible;
                animation: ${mypageAnimation.logoutDuribunFadeInRule};
              `
            : css`
                opacity: 0;
                visibility: hidden;
                animation: ${mypageAnimation.logoutDuribunFadeOutRule};
              `};
      }
      &__button {
        position: relative;
        z-index: 1;
        width: 172px;
        height: 56px;
        border-radius: 30px;
        font-weight: 500;
        font-size: 18px;
        color: var(--gray_7);
      }
    }
  }

  ${({ theme }) => theme.media.tablet`
    width: 564px;
    .user-info {
      .profile {
        &__info {
          .introduction {
            width: 372px;
            height: 72px;
          }
        }
      }
    }
    .cookie {
      .count-img-head {
        left: 460px;
      }
      .count-img-hand {
        left: 388px;
      }
      .cookie-count {
        font-size: 18px;
      }
    }
    .account {
      .account-item {
        &__email {
          .email-div {
            width: 402px;
          }
        }
      }
    }
    .setting{
      display: none;
    }
  `}
  ${({ theme, width }) => theme.media.mobile`
    width: 100%;
    padding: 0 20px;
    .user-info {
      margin-bottom: 4px;
      .profile {
        &__img {
          width: 96px;
          height: 96px;
          border-radius: 48px;
          margin-right: 20px;
        }
        &__info {
          flex: 1;
          .name-wrap {
            .name {
              width: auto;
              margin: 0;
              margin-right: 10px;
              font-size: 20px;
              color: var(--black_2);
            }
            .edit-button {
              width: 28px;
              height: 28px;
              border-radius: 14px;
            }
          }
          .introduction {
            width: auto;
            height: auto;
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
    }
    .cookie {
      margin-bottom: 48px;
      .count-img-head {
        left: ${width ? width - 134 : 200}px;
        top: 5px;
        width: 56px;
      }
      .count-img-hand {
        left: ${width ? width - 190 : 134}px;
        top: 5px;
        width: 49px;
      }
      .cookie-count {
        padding: 31px 33px;
        height: 120px;
        border-radius: 20px;
        font-size: 15px;
      }
    }
    .account {
      .account-item {
        &__text {
          font-size: 15px;
          line-height: 18.8px;
        }
        &__email {
          .email-div {
            padding: 16px 12px;
            width: 262px;
            height: 48px;
            &__text {
              font-size: 14px;
            }
            &__icon {
              width: 32px;
              height: 32px;
            }
          }
          .email-desc {
            font-size: 12px;
          }
        }
      }
    }
    .setting{
      display: none;
    }
    .service {
      .service-item {
        left: -11px;
        &__link {
          padding: 7px 11px;
          font-size: 15px;
        }
        &__link--disabled {
          padding: 7px 11px;
          font-size: 15px;
        }
      }
    }
    .button-wrap {
      .logout {
        &__img {
          left: 40px;
          top: 10px;
          width: 56px;
        }
        &__button {
          width: 136px;
          height: 48px;
          border-radius: 30px;
          font-size: 15px;
        }
      }
  `}
`;

const StyledBubble = styled(Bubble)`
  position: absolute;
  z-index: 2;
  left: -86px;
  margin-top: 25px;
  font-size: 13px;
  ${({ isHover }) =>
    isHover
      ? css`
          animation: ${mypageAnimation.bubbleFadeInRule};
          visibility: visible;
          opacity: 1;
        `
      : css`
          animation: ${mypageAnimation.bubbleFadeOutRule};
          opacity: 0;
          visibility: hidden;
        `};

  &::after {
    top: 65%;
    border: solid transparent;
    border-top-color: var(--white);
    border-width: 20px;
    margin-left: -20px;
  }
`;

interface CookieNumWrapProps {
  width: number;
}
const AllCookieNumWrap = styled.span<CookieNumWrapProps>`
  width: ${(props) => (props.width + 2) * 12}px;
  height: 40px;
  margin: 0 4px 0 10px;
  border-radius: 30px;
  background-color: var(--orange_sub);
  display: flex;
  align-items: center;
  justify-content: center;

  animation: stretch 1.5s;
  @keyframes stretch {
    from {
      width: ${(props) => props.width * 12}px;
    }
    to {
      width: ${(props) => (props.width + 2) * 12}px;
    }
  }
  ${({ width, theme }) =>
    theme.media.tablet`
      width: ${(width + 2) * 11}px;
      height: 36px;
      @keyframes stretch {
      from {
        width: ${width * 11}px;
      }
      to {
        width: ${(width + 2) * 11}px;
      }
    }
  `};
  ${({ width, theme }) =>
    theme.media.mobile`
      width: ${(width + 2) * 10}px;
      height:29px;
      @keyframes stretch {
      from {
        width: ${width * 10}px;
      }
      to {
        width: ${(width + 2) * 10}px;
      }
    }
  `};
`;
const ReadCookieNumWrap = styled.span<CookieNumWrapProps>`
  width: ${(props) => (props.width + 2) * 12}px;
  height: 40px;
  margin: 0 4px 0 10px;
  border-radius: 30px;
  background-color: var(--orange_sub);
  display: flex;
  align-items: center;
  justify-content: center;

  animation: stretchTwo 1.5s;
  @keyframes stretchTwo {
    from {
      width: ${(props) => props.width * 12}px;
    }
    to {
      width: ${(props) => (props.width + 2) * 12}px;
    }
  }
  ${({ width, theme }) =>
    theme.media.tablet`
      width: ${(width + 2) * 11}px;
      height: 36px;
      @keyframes stretchTwo {
      from {
        width: ${width * 11}px;
      }
      to {
        width: ${(width + 2) * 11}px;
      }
    }
  `};
  ${({ width, theme }) =>
    theme.media.mobile`
      width: ${(width + 2) * 10}px;
      height:29px;
      @keyframes stretchTwo {
      from {
        width: ${width * 10}px;
      }
      to {
        width: ${(width + 2) * 10}px;
      }
    }
  `};
`;
interface CookieNumProps {
  num: number;
  isOver?: boolean;
}
const AllCookieNum = styled.span<CookieNumProps>`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: var(--orange);

  @property --allNum {
    syntax: "<integer>";
    initial-value: ${({ num }) => num};
    inherits: false;
  }

  animation: allCounter 1.5s ease-out;
  counter-reset: allNum var(--allNum);

  ${({ isOver }) =>
    isOver
      ? css`
          ::after {
            content: counter(allNum) "+";
          }
        `
      : css`
          ::after {
            content: counter(allNum);
          }
        `}

  @keyframes allCounter {
    from {
      --allNum: 0;
    }
    to {
      --allNum: ${({ num }) => num};
    }
  }

  ${({ theme }) => theme.media.tablet`
    font-size: 18px;
    line-height: 21.6px;
  `}
  ${({ theme }) => theme.media.mobile`
    font-size: 18px;
    line-height: 18px;
  `}
`;
const ReadCookieNum = styled.span<CookieNumProps>`
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.4rem;
  color: var(--orange);

  @property --readNum {
    syntax: "<integer>";
    initial-value: ${({ num }) => num};
    inherits: false;
  }

  transition: all 1.5s ease-out;
  animation: readCounter 1.5s ease-out;
  counter-reset: readNum var(--readNum);

  ${({ isOver }) =>
    isOver
      ? css`
          ::after {
            content: counter(readNum) "+";
          }
        `
      : css`
          ::after {
            content: counter(readNum);
          }
        `}

  @keyframes readCounter {
    from {
      --readNum: 0;
    }
    to {
      --readNum: ${({ num }) => num};
    }
  }

  ${({ theme }) => theme.media.tablet`
    font-size: 18px;
    line-height: 21.6px;
  `}
  ${({ theme }) => theme.media.mobile`
    font-size: 18px;
    line-height: 18px;
  `}
`;

interface InfoProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  title: string;
}
const Info = ({ id, className, children, title }: InfoProps) => {
  return (
    <InfoWrap id={id} className={className}>
      <h1 className="info-title">{title}</h1>
      {children}
    </InfoWrap>
  );
};

const InfoWrap = styled.section`
  .info-title {
    width: 100%;
    height: 50px;
    margin: 0;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--gray_4);

    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    color: var(--black_2);
    ${({ theme }) => theme.media.mobile`
      font-size: 20px;
    `}
  }
`;
