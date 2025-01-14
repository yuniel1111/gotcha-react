import { GotchaPostType } from '../types/gotchaPostType';
import { PlatformPostType } from '../types/platformPostType';

export const transformPostFormat = (
  platformPost: PlatformPostType,
): GotchaPostType | undefined => {
  if (!platformPost) return;

  if (platformPost.platform === 'saramin') {
    const { content } = platformPost;
    const DEFAULT_VALUE = '';

    // title이 없으면 undefined 반환
    if (!content?.position?.title) {
      return undefined;
    }

    return {
      post_id: platformPost.post_id,
      platform_type: 'saramin',
      title: content.position?.title,
      company: content.company?.detail?.name || DEFAULT_VALUE,
      company_url: content.company?.detail?.href || DEFAULT_VALUE,
      location:
        content.position?.location?.name
          ?.replace(/>/g, '')
          .replace(/,/g, ', ') || DEFAULT_VALUE,
      job: content.position?.['job-code']?.name || DEFAULT_VALUE,
      industry: content.position?.industry?.name || DEFAULT_VALUE,
      experience: content.position?.['experience-level']?.name || DEFAULT_VALUE,
      deadline: new Date(platformPost.expiration_date) || DEFAULT_VALUE,
      company_type: DEFAULT_VALUE,
      employment_type: content.position?.['job-type']?.name || DEFAULT_VALUE,
      salary: content.salary?.name || DEFAULT_VALUE,
      education:
        content.position['required-education-level'].name || DEFAULT_VALUE,
      post_url: content.url || DEFAULT_VALUE,
      isBookmarked: false,
    };
  }

  return undefined;

  // if(postDetail.platform === 'goyong')
};
