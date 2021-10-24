import postApi from "@api/postApi";
import { PostCookieProps } from "@interfaces/cookie";
import axios from "axios";
import cheerio from "cheerio";

const GetSiteData = async (url: string): Promise<boolean> => {
  const data: PostCookieProps = {
    title: "",
    content: "",
    link: "",
    thumbnail: "",
    favicon: "",
    provider: "",
  };

  if (url) {
    data.link = url;

    const html = await returnHTML(url);
    if (!html) return false;
    const $ = cheerio.load(html || "");
    if (!$) return false;

    data.title = $("meta[property='og:title']").attr("content") || "";
    data.content = $("meta[property='og:description']").attr("content") || "";
    data.thumbnail = $("meta[property='og:image']").attr("content") || "";
    data.provider = $("meta[property='og:site_name']").attr("content") || "";
    data.favicon = findFavicon($, url);

    if (data.title === undefined) {
      data.title = $("title").text();
    }
    if (data.content === undefined) {
      data.content = "";
    }
    if (data.content.length > 200) {
      data.content = data.content.substr(0, 200);
    }
    if (data.thumbnail === undefined) {
      data.thumbnail = "";
    }
    if (data.thumbnail[0] === "/" && data.thumbnail[1] === "/") {
      data.thumbnail = `https:${data.thumbnail}`;
    }
    if (data.provider === undefined) {
      data.provider = "-";
    }

    const Response = await postApi.postCookie(data);
    return true;
  }
  return false;
};

const returnHTML = async (url: string): Promise<string | undefined> => {
  const HTML = await getHTML(url);
  return HTML;
};

const getHTML = async (url: string): Promise<string | undefined> => {
  try {
    const response = await axios.request({
      url,
      method: "GET",
      responseType: "arraybuffer",
      responseEncoding: "binary",
    });

    const decoded = await convertUTF8(response.data);
    return decoded;
  } catch (error) {
    console.log("[GET HTML] ERROR: ", error);
  }
};

const convertUTF8 = async (html: BufferSource | undefined) => {
  // arraybuffer -> string
  let enc = new TextDecoder("utf-8");

  // 'euc-kr'찾기
  const $ = cheerio.load(enc.decode(html));

  const charsetNormal = $("meta[http-equiv='Content-Type']").attr("content");
  const charsetUpper = $("meta[http-equiv='CONTENT-TYPE']").attr("content");
  const charsetLower = $("meta[http-equiv='content-type']").attr("content");
  const charset =
    charsetNormal !== undefined
      ? charsetNormal
      : charsetUpper !== undefined
      ? charsetUpper
      : charsetLower;

  if (charset !== undefined) {
    if (charset.toLowerCase().indexOf("euc-kr") > -1) {
      enc = new TextDecoder("euc-kr");
      return enc.decode(html);
    }
    if (charset.toLowerCase().indexOf("ksc5601") > -1) {
      enc = new TextDecoder("ksc5601");
      return enc.decode(html);
    }
    if (charset.toLowerCase().indexOf("iso-8859-1") > -1) {
      enc = new TextDecoder("iso-8859-1");
      return enc.decode(html);
    }
    if (charset.toLowerCase().indexOf("iso-8859-2") > -1) {
      enc = new TextDecoder("iso-8859-2");
      return enc.decode(html);
    }
  }

  return enc.decode(html);
};

const findFavicon = ($: cheerio.Root, url: string) => {
  const itemprop = $(`meta[itemprop="image"]`).attr("content") ?? undefined;
  const iconURL = $(`link[rel="icon"]`).attr("href") ?? undefined;
  const shortcutIconURL =
    $(`link[rel="shortcut icon"]`).attr("href") ?? undefined;
  const appleIconURL =
    $(`link[rel="apple-touch-icon"]`).attr("href") ?? undefined;
  const appleIconPreURL =
    $(`link[rel="apple-touch-icon-precomposed"]`).attr("href") ?? undefined;
  const IconURL =
    itemprop !== undefined
      ? itemprop
      : (iconURL !== undefined
          ? iconURL
          : shortcutIconURL !== undefined
          ? shortcutIconURL
          : appleIconURL !== undefined
          ? appleIconURL
          : appleIconPreURL) ?? "";
  if (IconURL === "" || IconURL[0] !== "/") {
    if (IconURL.substr(0, 4) !== "http") {
      let faviconURL;
      if (IconURL.substr(0, 2) === "..") {
        faviconURL = getURLDomain(url) + IconURL.substr(2);
      } else {
        faviconURL = `${getURLDomain(url)}/${IconURL}`;
      }
      return faviconURL;
    }
    return IconURL;
  }
  const httpPrefix = "https:";
  const faviconURL =
    IconURL[1] === "/" ? httpPrefix + IconURL : getURLDomain(url) + IconURL;
  return faviconURL;
};

const getURLDomain = (url: string) => {
  const end = url.indexOf("/", url.indexOf("/") + 2);
  return url.substring(0, end);
};

export default GetSiteData;
