import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { xml2js } from 'xml-js';
import { POST_URL } from '../constants/postUrl';

interface QueryType {
  staleTime?: number;
  cacheTime?: number;
}

const DEFAULT_QUERY_OPTION: QueryType = {
  staleTime: 1000 * 60 * 60 * 24,
  cacheTime: 1000 * 60 * 60 * 24,
};

const xmlToJson = (xml: string) => {
  const sanitizeXml = xml
    .trim() // 공백 제거
    .replace(/&(?!(amp;|lt;|gt;|quot;|apos;))/g, '&amp;') // 잘못된 '&' 처리
    .replace(/\s+/g, ' '); // 여러 공백과 줄바꿈을 단일 공백으로 변환

  const jsonData = xml2js(sanitizeXml, { compact: true });

  return jsonData;
};

const fetchPost = async (url: string) => {
  // 사람인은 json 형식 데이터 제공
  if (url === POST_URL.SARAMIN) {
    const post = (await axios.get(url)).data;
    return post;
  }

  // 고용24, 잡코리아는 xml 형식을 json 형식으로 변환 후 데이터 제공
  const xml = (await axios.get(url, { responseType: 'text' })).data;
  return xmlToJson(xml);
};

export const usePost = (
  url: string,
  queryKey: string,
  queryOption: QueryType = DEFAULT_QUERY_OPTION,
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchPost(url),
    ...queryOption,
  });

  return { data, isLoading, error };
};
