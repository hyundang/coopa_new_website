import styled from "styled-components";

const SkeletonCookie = () => {
  return (
    <CookieWrap>
      <div className="cookie-img" />
      <div className="cookie-content">
        <div className="title" />
        <div className="desc" />
        <div style={{ flexGrow: 1 }} />
        <div className="profile">
          <div className="profile__favicon" />
          <div className="profile__author" />
        </div>
      </div>
    </CookieWrap>
  );
};

export default SkeletonCookie;

const CookieWrap = styled.article`
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .cookie-img {
    position: relative;
    width: 100%;
    padding-bottom: calc(136 / 270 * 100%);
    border-radius: 10px;
    background-color: var(--gray_3);
  }

  .cookie-content {
    padding: 12px 10px 46px 10px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .title {
      width: 100%;
      height: 20px;
      background-color: var(--gray_3);
      border-radius: 4px;
    }

    .desc {
      width: 100%;
      height: 20px;
      background-color: var(--gray_2);
      border-radius: 4px;
    }

    .profile {
      line-height: normal;
      display: flex;
      align-items: center;
      &__favicon {
        margin-right: 8px;
        width: 22px;
        height: 22px;
        border-radius: 4px;
        background-color: var(--gray_3);
      }
      &__author {
        width: 57px;
        height: 12px;
        background-color: var(--gray_3);
        border-radius: 4px;
      }
    }
  }

  ${({ theme }) => theme.media.mobile`
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: 28px 0;

    .cookie-img {
        width: 108px;
        height: 72px;
        border-radius: 8px;
        margin-right: 18px;
        padding-bottom: 0;
    }

    .cookie-content {
        padding: 0;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .title {
            margin-bottom: 4px;
            border-radius: 4px;
        }

        .desc {
            border-radius: 4px;
        }

        .profile {
            line-height: normal;
            display: flex;
            align-items: center;
            &__favicon {
                display: none;
            }
            &__author {
                width: 57px;
                height: 12px;
                border-radius: 4px;
            }
        }
    }
  `}
`;
