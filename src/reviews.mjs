import {escapeHtml as esc,icon} from './layout.mjs';

// Add only client feedback verified against the source profile or supplied by Hanzla.
// Upwork currently blocks automated access; no ratings or quotations are inferred.
export const reviews=[];
export const upworkUrl='https://www.upwork.com/freelancers/~017b2fcbe223c90e1a';

export function clientFeedback(){
 const cards=reviews.map(r=>`<article class="review-card"><p class="review-source">UPWORK CLIENT FEEDBACK</p>${r.rating?`<p class="review-rating" aria-label="${Number(r.rating)} out of 5">${'★'.repeat(Math.round(r.rating))}<span>${Number(r.rating).toFixed(1)} / 5</span></p>`:''}<blockquote><p>“${esc(r.quote)}”</p></blockquote><div class="review-author"><span>${esc(r.client||'Upwork client')}</span><p>${esc(r.project)}</p></div><a class="text-link" href="${upworkUrl}" target="_blank" rel="noopener noreferrer">View on Upwork ${icon('arrow')}</a></article>`).join('');
 return `<section class="reviews-section section-pad wrap" id="reviews" aria-labelledby="reviews-title"><div class="section-heading reveal"><div><p class="eyebrow">06 / CLIENT FEEDBACK</p><h2 id="reviews-title">A closer look at<br><span>working together.</span></h2></div><p>Work history and client feedback.<br>Explore my profile on Upwork.</p></div>${cards?`<div class="reviews-grid">${cards}</div>`:''}<a class="upwork-profile-card" href="${upworkUrl}" target="_blank" rel="noopener noreferrer" aria-label="View Hanzla Amjad’s work history and client feedback on Upwork"><div class="upwork-profile-mark" aria-hidden="true">up<span>work</span></div><div class="upwork-profile-copy"><p class="eyebrow">MY FREELANCE PROFILE</p><h3>Get to know the work.</h3><p>Explore my work history, client feedback and professional background on Upwork.</p><ul class="tags"><li>Work history</li><li>Client feedback</li><li>Profile details</li></ul></div><span class="upwork-profile-link">View profile ${icon('arrow')}</span></a></section>`;
}
