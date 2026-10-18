import {escapeHtml as esc,icon} from './layout.mjs';

// Add only client feedback verified against the source profile or supplied by Hanzla.
// Transcribed from the Upwork feedback screenshot supplied on 19 October 2026.
// Only the visible, complete wording is quoted; truncated endings are omitted.
export const reviews=[
 {client:'Jawad Ali S.',project:'GoHighLevel Expert Needed',rating:5,date:'2026-08-24',displayDate:'24 Aug 2026',quote:'Hanzla is an excellent GoHighLevel automation expert. He understood the requirements quickly, built and optimized the workflows professionally…'},
 {client:'Saad A.',project:'GoHighlevel Automation Expert Needed',rating:5,date:'2026-05-18',displayDate:'18 May 2026',quote:'Really good experience working with Hanzla. He understood the requirements quickly, communicated well, and set up everything smoothly.'}
];
export const upworkUrl='https://www.upwork.com/freelancers/~017b2fcbe223c90e1a';

export function clientFeedback(){
 const cards=reviews.map(r=>`<article class="review-card"><div class="review-top"><p class="review-source">UPWORK CLIENT FEEDBACK</p><time datetime="${r.date}">${r.displayDate}</time></div>${r.rating?`<p class="review-rating" aria-label="${Number(r.rating)} out of 5">${'★'.repeat(Math.round(r.rating))}<span>${Number(r.rating).toFixed(1)} / 5</span></p>`:''}<blockquote><p>“${esc(r.quote)}”</p></blockquote><div class="review-author"><span class="review-client-name">${esc(r.client||'Upwork client')}</span><p>${esc(r.project)}</p></div><a class="text-link" href="${upworkUrl}" target="_blank" rel="noopener noreferrer">Read full feedback ${icon('arrow')}</a></article>`).join('');
 return `<section class="reviews-section section-pad wrap" id="reviews" aria-labelledby="reviews-title"><div class="section-heading reveal"><div><p class="eyebrow">07 / CLIENT FEEDBACK</p><h2 id="reviews-title">Good work.<br><span>Kind words.</span></h2></div><p>Excerpts from client feedback.<br>Read the full reviews on Upwork.</p></div>${cards?`<div class="reviews-grid">${cards}</div><div class="reviews-footnote"><p>Client feedback · Two shared reviews</p><a class="text-link" href="${upworkUrl}" target="_blank" rel="noopener noreferrer">View my Upwork profile ${icon('arrow')}</a></div>`:`<a class="upwork-profile-card" href="${upworkUrl}" target="_blank" rel="noopener noreferrer" aria-label="View Hanzla Amjad’s work history and client feedback on Upwork"><div class="upwork-profile-mark" aria-hidden="true">up<span>work</span></div><div class="upwork-profile-copy"><p class="eyebrow">MY FREELANCE PROFILE</p><h3>Get to know the work.</h3><p>Explore my work history, client feedback and professional background on Upwork.</p><ul class="tags"><li>Work history</li><li>Client feedback</li><li>Profile details</li></ul></div><span class="upwork-profile-link">View profile ${icon('arrow')}</span></a>`}</section>`;
}
