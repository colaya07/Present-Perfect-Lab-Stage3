/* Present Perfect Lab — learning activities and browser-local progress. */
'use strict';

const STORAGE_KEY = 'presentPerfectLab.progress.v1';
const COMPETENCIES = {
  structure: { name: 'Have/has and sentence structure', explanation: 'Choose have or has to agree with the subject, and keep the past participle after it.', review: '#grammar', activity: '#ordering', label: 'sentence structure' },
  participles: { name: 'Regular and irregular past participles', explanation: 'The Present Perfect needs a past participle. Some verbs use -ed; others have an irregular form such as seen, written or gone.', review: '#grammar', activity: '#matching', label: 'past participles' },
  contrast: { name: 'Present Perfect vs. Past Simple', explanation: 'Use Present Perfect when the time is not finished or the experience connects to now. Use Past Simple with a finished time such as yesterday or last night.', review: '#grammar', activity: '#matching', label: 'Present Perfect vs. Past Simple' },
  duration: { name: 'Since and for', explanation: 'Use for with a length of time (for three years) and since with the starting point (since 2022).', review: '#grammar', activity: '#time-expressions', label: 'since and for' },
  adverbs: { name: 'Already, yet and just', explanation: 'Already means before now; yet is common in questions and negatives; just means a very short time ago.', review: '#grammar', activity: '#time-expressions', label: 'already, yet and just' },
  experience: { name: 'Ever and never', explanation: 'Use ever to ask about any time in someone’s life. Use never to say an experience has not happened.', review: '#grammar', activity: '#time-expressions', label: 'ever and never' },
  reading: { name: 'Reading comprehension', explanation: 'Read for key details and find evidence in the passage before choosing an answer.', review: '#reading', activity: '#reading', label: 'reading comprehension' }
};

const MATCHING = [
  { q: 'She ___ finished her science project.', a: 'has', c: 'structure', why: 'Use has with she, he and it.' },
  { q: 'We have ___ that new film.', a: 'seen', c: 'participles', why: 'Seen is the past participle of see.' },
  { q: 'Have you ___ visited another country?', a: 'ever', c: 'experience', why: 'Ever asks about an experience at any time in your life.' },
  { q: 'I have lived here ___ 2021.', a: 'since', c: 'duration', why: 'Since introduces the starting point: 2021.' },
  { q: 'They have ___ eaten, so they are not hungry.', a: 'already', c: 'adverbs', why: 'Already means the action happened before now.' },
  { q: 'He went to the cinema ___ night.', a: 'last', c: 'contrast', why: 'Last night is a finished past time, so use Past Simple.' },
  { q: 'I have ___ tried skiing. It is not an experience I have had.', a: 'never', c: 'experience', why: 'Never means not at any time.' },
  { q: 'Have you finished your homework ___?', a: 'yet', c: 'adverbs', why: 'Yet is common at the end of questions about something expected by now.' },
  { q: 'My brother has ___ a new bike.', a: 'bought', c: 'participles', why: 'Bought is the past participle of buy.' },
  { q: 'She has studied English ___ three years.', a: 'for', c: 'duration', why: 'For introduces a duration: three years.' }
];
const MATCH_OPTIONS = ['has','seen','ever','since','already','last','never','yet','bought','for'];

const READING = {
  r1: { answer: 'b', c: 'reading', why: 'The first paragraph says: “Two years ago, Maya decided to learn how to make short films.”', evidence: '“Two years ago, Maya decided to learn how to make short films.”' },
  r2: { answer: 'a', c: 'reading', why: 'The first paragraph explains that Maya had always enjoyed taking photos.', evidence: '“She had always enjoyed taking photos…”' },
  r3: { answer: 'two', c: 'reading', why: 'Any two skills from the second paragraph are accepted: plan a story, record clear sound, or edit clips.', evidence: '“She has learned how to plan a story, record clear sound, and edit clips on her laptop.”' },
  r4: { answer: 'c', c: 'reading', why: 'The third paragraph says that Maya has made six short films so far.', evidence: '“Maya has made six short films so far.”' },
  r5: { answer: 'false', c: 'reading', why: 'The film is about a community garden, not a school.', evidence: '“Her most recent film is about a community garden in her neighbourhood.”' },
  r6: { answer: 'film club', c: 'reading', why: 'Maya joined a local film club and met people who share her interests.', evidence: '“She has also joined a local film club, where she has met people who share her interests.”' },
  r7: { answer: 'b', c: 'reading', why: 'The final paragraph says she has not become a professional filmmaker yet.', evidence: '“Maya has not become a professional filmmaker yet…”' },
  r8: { answer: 'community', c: 'reading', why: 'She wants to tell a story about young people helping their community.', evidence: '“She wants to tell a story about young people who are helping their community.”' }
};
const ORDERING = [
  { words: ['She','has','visited','three','countries'], answer: 'She has visited three countries', c: 'structure', why: 'Subject + has + past participle + rest of the sentence.' },
  { words: ['They','have','not','finished','the','game'], answer: 'They have not finished the game', c: 'structure', why: 'In a negative sentence, put not after have or has.' },
  { words: ['Have','you','ever','seen','a','whale'], answer: 'Have you ever seen a whale', c: 'experience', why: 'In a question, have comes before the subject. Ever goes before the past participle.' },
  { words: ['I','have','lived','here','for','two','years'], answer: 'I have lived here for two years', c: 'duration', why: 'Use for before a duration such as two years.' },
  { words: ['He','has','just','arrived'], answer: 'He has just arrived', c: 'adverbs', why: 'Just goes between has and the past participle.' },
  { words: ['We','watched','the','film','yesterday'], answer: 'We watched the film yesterday', c: 'contrast', why: 'Yesterday is a finished past time, so use Past Simple (watched).' }
];
const TIME_QUESTIONS = [
  { q: 'Have you ___ eaten Colombian arepas?', options: ['ever','since','for'], a: 'ever', c: 'experience', why: 'Ever asks about an experience at any time in your life.' },
  { q: 'I have ___ travelled by plane. I would like to try it one day.', options: ['already','never','yet'], a: 'never', c: 'experience', why: 'Never means the experience has not happened.' },
  { q: 'She has ___ finished her homework, so she can play now.', options: ['already','since','ever'], a: 'already', c: 'adverbs', why: 'Already shows that the task is complete before now.' },
  { q: 'Have they arrived ___?', options: ['just','yet','for'], a: 'yet', c: 'adverbs', why: 'Yet is often used at the end of questions.' },
  { q: 'My parents have ___ come home. They arrived a minute ago.', options: ['just','ever','since'], a: 'just', c: 'adverbs', why: 'Just describes something that happened a very short time ago.' },
  { q: 'We have known our neighbours ___ 2020.', options: ['for','since','yet'], a: 'since', c: 'duration', why: 'Since introduces the starting point (2020).' },
  { q: 'I have studied English ___ four years.', options: ['since','ever','for'], a: 'for', c: 'duration', why: 'For introduces a length of time (four years).' }
];

function emptyProgress() { return { version: 1, activities: {}, attempts: Object.fromEntries(Object.keys(COMPETENCIES).map(k => [k, []])) }; }
function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || saved.version !== 1 || typeof saved !== 'object') return emptyProgress();
    const clean = emptyProgress();
    clean.activities = saved.activities && typeof saved.activities === 'object' ? saved.activities : {};
    for (const key of Object.keys(COMPETENCIES)) clean.attempts[key] = Array.isArray(saved.attempts?.[key]) ? saved.attempts[key].slice(-20) : [];
    return clean;
  } catch (error) { console.warn('Could not read saved progress:', error); return emptyProgress(); }
}
let progress = loadProgress();
function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
  catch (error) { console.warn('Progress could not be saved in this browser.', error); }
}
function shuffle(items) { const copy = [...items]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
function normalize(value) { return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
function recordAttempt(activityId, label, competencyResults, score, total) {
  const timestamp = new Date().toISOString();
  for (const [key, result] of Object.entries(competencyResults)) {
    if (!progress.attempts[key]) progress.attempts[key] = [];
    progress.attempts[key].push({ timestamp, activity: activityId, correct: result.correct, total: result.total, accuracy: result.total ? result.correct / result.total : 0 });
    progress.attempts[key] = progress.attempts[key].slice(-20);
  }
  progress.activities[activityId] = { label, score, total, timestamp };
  saveProgress(); renderDashboard();
}
function aggregateByCompetency(items) {
  const output = {};
  items.forEach(item => { const key = item.c; if (!output[key]) output[key] = { correct: 0, total: 0 }; output[key].total++; if (item.correct) output[key].correct++; });
  return output;
}
function statusFor(attempts) {
  if (!attempts.length) return { label: 'Pending', className: 'pending', accuracy: null, count: 0 };
  if (attempts.length < 2) return { label: 'Insufficient evidence', className: 'insufficient', accuracy: null, count: attempts.length };
  const recent = attempts.slice(-2);
  const total = recent.reduce((sum, a) => sum + a.total, 0);
  const correct = recent.reduce((sum, a) => sum + a.correct, 0);
  const accuracy = total ? correct / total : 0;
  return { label: accuracy >= 0.8 ? 'Mastered' : 'Needs practice', className: accuracy >= 0.8 ? 'mastered' : 'needs-practice', accuracy, count: attempts.length };
}
function activityStatus(id) { const item = progress.activities[id]; return item ? `${item.score}/${item.total} · ${new Date(item.timestamp).toLocaleDateString()}` : 'Not completed'; }

// Matching activity
const matchingContainer = document.getElementById('matching-questions');
let matchingOrder = shuffle(MATCHING);
function renderMatching() {
  matchingContainer.innerHTML = matchingOrder.map((item, i) => `<div class="match-row" data-index="${i}"><div class="match-prompt"><span class="match-num">${i + 1}</span><span>${escapeHTML(item.q)}</span></div><select aria-label="Answer for matching question ${i + 1}"><option value="">Choose an answer…</option>${MATCH_OPTIONS.map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select><p class="question-feedback" aria-live="polite"></p></div>`).join('');
  matchingContainer.querySelectorAll('select').forEach(select => select.addEventListener('change', updateUniqueOptions));
  updateUniqueOptions();
}
function updateUniqueOptions() {
  const selects = [...matchingContainer.querySelectorAll('select')];
  const chosen = selects.map(s => s.value).filter(Boolean);
  selects.forEach(select => [...select.options].forEach(option => { if (option.value) option.disabled = chosen.includes(option.value) && select.value !== option.value; }));
}
function evaluateMatching() {
  const rows = [...matchingContainer.querySelectorAll('.match-row')];
  const unanswered = rows.filter(row => !row.querySelector('select').value);
  if (unanswered.length) { document.getElementById('matching-feedback').textContent = `Please answer all ${unanswered.length} remaining question(s).`; document.getElementById('matching-feedback').className = 'feedback error'; unanswered[0].querySelector('select').focus(); return; }
  const results = rows.map(row => { const item = matchingOrder[Number(row.dataset.index)]; const value = row.querySelector('select').value; const correct = value === item.a; row.classList.toggle('correct', correct); row.classList.toggle('incorrect', !correct); row.querySelector('.question-feedback').textContent = correct ? `Correct. ${item.why}` : `Correct answer: ${item.a}. ${item.why}`; return { c: item.c, correct }; });
  const score = results.filter(r => r.correct).length; const byComp = aggregateByCompetency(results.map(r => ({...r, total: 1})));
  document.getElementById('matching-score').textContent = `${score} / 10`; document.getElementById('matching-status').textContent = 'Evaluated';
  const feedback = document.getElementById('matching-feedback'); feedback.textContent = score >= 8 ? 'Great work. Read the explanations to strengthen what you know.' : 'Review the explanations beside each answer, then try again.'; feedback.className = `feedback ${score >= 8 ? 'success' : 'error'}`;
  recordAttempt('matching', 'Matching', byComp, score, 10);
}
function resetMatching() { matchingOrder = shuffle(MATCHING); renderMatching(); document.getElementById('matching-feedback').textContent = ''; document.getElementById('matching-score').textContent = '— / 10'; document.getElementById('matching-status').textContent = 'Not completed'; }
renderMatching();
document.getElementById('check-matching').addEventListener('click', evaluateMatching);
document.getElementById('reset-matching').addEventListener('click', resetMatching);

// Reading activity: short-answer responses accept reasonable wording variations.
function readValue(name) { const checked = document.querySelector(`input[name="${name}"]:checked`); return checked ? checked.value : (document.querySelector(`[name="${name}"]`)?.value || ''); }
function evaluateReading(event) {
  event.preventDefault(); const names = Object.keys(READING); const empty = names.filter(name => !readValue(name).trim());
  if (empty.length) { const feedback = document.getElementById('reading-feedback'); feedback.textContent = `Please answer all ${empty.length} remaining question(s).`; feedback.className = 'feedback error'; document.querySelector(`[name="${empty[0]}"]`).focus(); return; }
  const results = names.map(name => {
    const item = READING[name]; const value = normalize(readValue(name)); let correct = false;
    if (name === 'r3') { const skills = ['plan a story','record clear sound','edit clips']; correct = skills.filter(skill => value.includes(normalize(skill))).length >= 2; }
    else if (name === 'r6') correct = value.includes('film club') || value === 'a local club' || value === 'local film club';
    else if (name === 'r8') correct = value.includes('community') || value.includes('young people');
    else correct = value === normalize(item.answer);
    const card = document.querySelector(`[data-q="${name}"]`); card.classList.toggle('correct', correct); card.classList.toggle('incorrect', !correct);
    card.querySelector('.question-feedback').innerHTML = `${correct ? 'Correct.' : `Correct answer: ${escapeHTML(item.answer === 'two' ? 'Any two listed skills' : item.answer)}.`} ${escapeHTML(item.why)}<br><span class="evidence">Text evidence: ${escapeHTML(item.evidence)}</span>`;
    return { c: item.c, correct };
  });
  const score = results.filter(r => r.correct).length; const byComp = aggregateByCompetency(results.map(r => ({...r, total: 1})));
  document.getElementById('reading-score').textContent = `${score} / 8`; document.getElementById('reading-status').textContent = 'Evaluated';
  const feedback = document.getElementById('reading-feedback'); feedback.textContent = score >= 6 ? 'Good reading. Check the evidence to confirm your understanding.' : 'Use the text evidence to review details you missed.'; feedback.className = `feedback ${score >= 6 ? 'success' : 'error'}`;
  recordAttempt('reading', 'Reading', byComp, score, 8);
}
document.getElementById('reading-form').addEventListener('submit', evaluateReading);
document.getElementById('reset-reading').addEventListener('click', () => { document.getElementById('reading-form').reset(); document.querySelectorAll('.question-card').forEach(card => { card.classList.remove('correct','incorrect'); card.querySelector('.question-feedback').textContent = ''; }); document.getElementById('reading-feedback').textContent = ''; document.getElementById('reading-score').textContent = '— / 8'; document.getElementById('reading-status').textContent = 'Not completed'; });

// Sentence ordering: accessible word buttons build a sentence in the selected order.
const orderingContainer = document.getElementById('ordering-questions');
let orderingState = ORDERING.map(item => ({ tokens: shuffle(item.words), selected: [] }));
function renderOrdering() {
  orderingContainer.innerHTML = ORDERING.map((item, i) => `<article class="order-card" data-order="${i}"><div class="order-card-heading"><span class="number-badge">${i + 1}</span><div><span class="order-type">${['AFFIRMATIVE','NEGATIVE','QUESTION','DURATION','TIME EXPRESSION','PAST SIMPLE'][i]}</span><h3>${['Make a life-experience sentence','Make a negative sentence','Ask about an experience','Use a duration','Use just','Use a finished past time'][i]}</h3></div></div><div class="word-bank" aria-label="Available words">${orderingState[i].tokens.map((word, j) => `<button type="button" class="word-chip" data-word="${j}" ${orderingState[i].selected.includes(j) ? 'disabled' : ''}>${escapeHTML(word)}</button>`).join('')}</div><div class="sentence-build" aria-label="Your sentence" aria-live="polite">${orderingState[i].selected.map(j => `<span class="built-word">${escapeHTML(orderingState[i].tokens[j])}</span>`).join('') || '<span class="build-placeholder">Your sentence will appear here…</span>'}</div><div class="order-tools"><button type="button" class="small-button" data-action="undo">Undo</button><button type="button" class="small-button" data-action="clear">Clear sentence</button></div><p class="question-feedback" aria-live="polite"></p></article>`).join('');
  orderingContainer.querySelectorAll('.word-chip').forEach(button => button.addEventListener('click', () => { const card = button.closest('.order-card'); const i = Number(card.dataset.order); orderingState[i].selected.push(Number(button.dataset.word)); renderOrdering(); }));
  orderingContainer.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => { const card = button.closest('.order-card'); const i = Number(card.dataset.order); if (button.dataset.action === 'undo') orderingState[i].selected.pop(); else orderingState[i].selected = []; renderOrdering(); }));
}
function evaluateOrdering() {
  const incomplete = orderingState.findIndex(s => s.selected.length !== s.tokens.length);
  if (incomplete !== -1) { const feedback = document.getElementById('ordering-feedback'); feedback.textContent = 'Complete every sentence before checking your answers.'; feedback.className = 'feedback error'; orderingContainer.querySelector(`[data-order="${incomplete}"] .word-chip:not(:disabled)`)?.focus(); return; }
  const results = ORDERING.map((item, i) => { const actual = orderingState[i].selected.map(j => orderingState[i].tokens[j]).join(' '); const correct = normalize(actual) === normalize(item.answer); const card = orderingContainer.querySelector(`[data-order="${i}"]`); card.classList.toggle('correct', correct); card.classList.toggle('incorrect', !correct); card.querySelector('.question-feedback').textContent = `${correct ? 'Correct.' : `Suggested sentence: ${item.answer}.`} ${item.why}`; return { c: item.c, correct }; });
  const score = results.filter(r => r.correct).length; const byComp = aggregateByCompetency(results.map(r => ({...r, total: 1})));
  document.getElementById('ordering-score').textContent = `${score} / 6`; const feedback = document.getElementById('ordering-feedback'); feedback.textContent = score >= 5 ? 'Well done. You built the sentence structures successfully.' : 'Read the word-order explanations and try building the sentences again.'; feedback.className = `feedback ${score >= 5 ? 'success' : 'error'}`;
  recordAttempt('ordering', 'Sentence Ordering', byComp, score, 6);
}
function resetOrdering() { orderingState = ORDERING.map(item => ({ tokens: shuffle(item.words), selected: [] })); renderOrdering(); document.getElementById('ordering-score').textContent = '— / 6'; document.getElementById('ordering-feedback').textContent = ''; }
renderOrdering(); document.getElementById('check-ordering').addEventListener('click', evaluateOrdering); document.getElementById('reset-ordering').addEventListener('click', resetOrdering);

// Time-expression activity
const timeContainer = document.getElementById('time-questions');
function renderTime() { timeContainer.innerHTML = TIME_QUESTIONS.map((item, i) => `<article class="time-card" data-time="${i}"><p class="question-number">QUESTION ${String(i + 1).padStart(2,'0')}</p><h3>${escapeHTML(item.q)}</h3><div class="time-options">${item.options.map(opt => `<label class="time-option"><input type="radio" name="time${i}" value="${opt}"><span>${opt}</span></label>`).join('')}</div><p class="question-feedback" aria-live="polite"></p></article>`).join(''); }
function evaluateTime() {
  const missing = TIME_QUESTIONS.findIndex((item, i) => !document.querySelector(`input[name="time${i}"]:checked`));
  if (missing !== -1) { const feedback = document.getElementById('time-feedback'); feedback.textContent = 'Please answer all seven questions before checking.'; feedback.className = 'feedback error'; document.querySelector(`input[name="time${missing}"]`).focus(); return; }
  const results = TIME_QUESTIONS.map((item, i) => { const value = document.querySelector(`input[name="time${i}"]:checked`).value; const correct = value === item.a; const card = timeContainer.querySelector(`[data-time="${i}"]`); card.classList.toggle('correct', correct); card.classList.toggle('incorrect', !correct); card.querySelector('.question-feedback').textContent = `${correct ? 'Correct.' : `Correct answer: ${item.a}.`} ${item.why}`; return { c: item.c, correct }; });
  const score = results.filter(r => r.correct).length; const byComp = aggregateByCompetency(results.map(r => ({...r, total: 1})));
  document.getElementById('time-score').textContent = `${score} / 7`; document.getElementById('time-status').textContent = 'Evaluated'; const feedback = document.getElementById('time-feedback'); feedback.textContent = score >= 6 ? 'Excellent use of time expressions.' : 'Review the explanation beside each answer, then try again.'; feedback.className = `feedback ${score >= 6 ? 'success' : 'error'}`;
  recordAttempt('time', 'Time Expressions', byComp, score, 7);
}
function resetTime() { timeContainer.querySelectorAll('input').forEach(input => { input.checked = false; }); timeContainer.querySelectorAll('.time-card').forEach(card => { card.classList.remove('correct','incorrect'); card.querySelector('.question-feedback').textContent = ''; }); document.getElementById('time-score').textContent = '— / 7'; document.getElementById('time-status').textContent = 'Not completed'; document.getElementById('time-feedback').textContent = ''; }
renderTime(); document.getElementById('check-time').addEventListener('click', evaluateTime); document.getElementById('reset-time').addEventListener('click', resetTime);

// Dashboard: mastery uses the two most recent evaluated attempts per competency.
function renderDashboard() {
  const allAttempts = Object.values(progress.attempts).flat(); const evaluatedActivities = Object.keys(progress.activities).length;
  const mastered = Object.keys(COMPETENCIES).filter(key => statusFor(progress.attempts[key] || []).label === 'Mastered').length;
  const summary = document.getElementById('dashboard-summary');
  summary.innerHTML = `<div class="summary-card"><span>Activities evaluated</span><strong>${evaluatedActivities} / 4</strong></div><div class="summary-card"><span>Competencies mastered</span><strong>${mastered} / 7</strong></div><div class="summary-card"><span>Evaluated competency attempts</span><strong>${allAttempts.length}</strong></div>`;
  const activityNames = [['matching','Matching','10 questions'],['reading','Reading','8 questions'],['ordering','Sentence Ordering','6 questions'],['time','Time Expressions','7 questions']];
  document.getElementById('activity-results').innerHTML = activityNames.map(([id,name,detail]) => { const item = progress.activities[id]; return `<div class="activity-result"><div class="result-icon">${({matching:'↔',reading:'▤',ordering:'☷',time:'◷'})[id]}</div><div class="activity-result-copy"><strong>${name}</strong><small>${detail}</small></div><span class="activity-result-score">${item ? `${item.score}/${item.total}` : '—'}</span></div>`; }).join('');
  document.getElementById('competency-results').innerHTML = Object.entries(COMPETENCIES).map(([key, item]) => { const status = statusFor(progress.attempts[key] || []); const percent = status.accuracy === null ? 0 : Math.round(status.accuracy * 100); return `<div class="competency-item"><div class="competency-heading"><strong>${escapeHTML(item.name)}</strong><span class="status-pill ${status.className}">${status.label}</span></div><div class="competency-track"><span style="width:${percent}%"></span></div><small>${status.accuracy === null ? `${status.count} evaluated attempt${status.count === 1 ? '' : 's'} · more evidence needed` : `${percent}% across the two most recent attempts · ${status.count} total attempt(s)`}</small></div>`; }).join('');
  renderRecommendations();
}
function renderRecommendations() {
  const ranked = Object.entries(COMPETENCIES).map(([key,item]) => ({ key, item, status: statusFor(progress.attempts[key] || []) })).filter(x => x.status.label === 'Needs practice').sort((a,b) => a.status.accuracy - b.status.accuracy);
  const insufficient = Object.entries(COMPETENCIES).map(([key,item]) => ({key,item,status:statusFor(progress.attempts[key] || [])})).filter(x => x.status.label === 'Insufficient evidence');
  const pending = Object.entries(COMPETENCIES).map(([key,item]) => ({key,item,status:statusFor(progress.attempts[key] || [])})).filter(x => x.status.label === 'Pending');
  const picks = [...ranked, ...insufficient, ...pending].slice(0,3);
  const container = document.getElementById('recommendations');
  if (!picks.length) { container.innerHTML = '<p class="recommendation-empty">You have evidence for all seven competencies. Keep practising to maintain your skills and check your latest results.</p>'; return; }
  container.innerHTML = picks.map(({key,item,status}) => {
    const title = status.label === 'Needs practice' ? `Reinforce ${item.label}` : status.label === 'Insufficient evidence' ? `Get one more result: ${item.label}` : `Start practising: ${item.label}`;
    const detail = status.label === 'Needs practice' ? item.explanation : status.label === 'Insufficient evidence' ? `You have one evaluated attempt. Complete and submit another activity that checks ${item.label} to build enough evidence for a progress status.` : `This skill has not been evaluated yet. Begin with the explanation, then complete a related activity.`;
    return `<article class="recommendation"><span class="recommendation-mark">${status.label === 'Needs practice' ? '↗' : '→'}</span><div><span class="recommendation-status">${status.label}</span><h4>${escapeHTML(title)}</h4><p>${escapeHTML(detail)}</p><div class="recommendation-links"><a href="${item.review}">Review explanation / text</a><a href="${item.activity}">Practise this skill</a></div></div></article>`;
  }).join('');
}
renderDashboard();
function restoreActivityDisplays() {
  const saved = progress.activities;
  if (saved.matching) { document.getElementById('matching-score').textContent = `${saved.matching.score} / ${saved.matching.total}`; document.getElementById('matching-status').textContent = 'Previously evaluated'; }
  if (saved.reading) { document.getElementById('reading-score').textContent = `${saved.reading.score} / ${saved.reading.total}`; document.getElementById('reading-status').textContent = 'Previously evaluated'; }
  if (saved.ordering) document.getElementById('ordering-score').textContent = `${saved.ordering.score} / ${saved.ordering.total}`;
  if (saved.time) { document.getElementById('time-score').textContent = `${saved.time.score} / ${saved.time.total}`; document.getElementById('time-status').textContent = 'Previously evaluated'; }
}
restoreActivityDisplays();

// Reset only after an explicit confirmation.
document.getElementById('reset-progress').addEventListener('click', () => {
  const confirmed = window.confirm('Reset all Present Perfect Lab progress saved in this browser? This cannot be undone.');
  if (!confirmed) return;
  progress = emptyProgress(); saveProgress(); renderDashboard();
  resetMatching(); document.getElementById('reading-form').reset(); document.querySelectorAll('.question-card').forEach(card => { card.classList.remove('correct','incorrect'); card.querySelector('.question-feedback').textContent = ''; });
  document.getElementById('reading-score').textContent = '— / 8'; document.getElementById('reading-status').textContent = 'Not completed'; document.getElementById('reading-feedback').textContent = '';
  resetOrdering(); resetTime(); document.getElementById('reset-feedback').textContent = 'All progress saved in this browser has been reset.';
});

// Mobile navigation
const navToggle = document.getElementById('nav-toggle'); const mainNav = document.getElementById('main-nav');
navToggle.addEventListener('click', () => { const expanded = navToggle.getAttribute('aria-expanded') === 'true'; navToggle.setAttribute('aria-expanded', String(!expanded)); navToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation'); mainNav.classList.toggle('nav-open', !expanded); });
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { mainNav.classList.remove('nav-open'); navToggle.setAttribute('aria-expanded','false'); navToggle.setAttribute('aria-label','Open navigation'); }));
