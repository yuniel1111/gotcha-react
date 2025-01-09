import { GotchaPostType } from '../types/gotchaPostType';
import { PlatformPostType } from '../types/platFormPostType';

export const transformPostFormat = (
  platformPost: PlatformPostType,
): GotchaPostType | undefined => {
  if (!platformPost) return;

  if (platformPost.platform === 'saramin') {
    const content = platformPost.content;

    // title이 없으면 undefined 반환
    if (!content?.position?.title) {
      return undefined;
    }

    return {
      post_id: platformPost.post_id,
      platform_type: 'saramin',
      title: content.position?.title,
      company: content.company?.detail?.name,
      company_url: content.company?.detail?.href,
      location: content.position?.location?.name
        ?.replace(/>/g, '')
        .replace(/,/g, ', '),
      job: content.position?.['job-code']?.name,
      industry: content.position?.industry?.name,
      experience: content.position?.['experience-level']?.name,
      deadline: new Date(platformPost.expiration_date),
      company_type: '',
      employment_type: content.position?.['job-type']?.name,
      salary: content.salary?.name,
      education: content.position['required-education-level'].name,
      post_url: content.url,
      isBookmarked: false,
    };
  }

  return undefined;

  // if(postDetail.platform === 'goyong')
};
