// --- MODULE PHÒNG THI VIẾT (WRITING) ---
// --- PHẦN 6: HIỆN THỰC HÓA PHÒNG THI VIẾT (Writing) ---
function initWritingExam() {
    const promptPane = document.getElementById('writingPromptPane');
    const translationBox = document.getElementById('writingPromptTranslation');
    const db = adaptiveDb.writing;

    promptPane.innerHTML = db.media;
    translationBox.innerHTML = db.mediaTranslation;
    document.getElementById('writingEditor').value = "";
    document.getElementById('wordCounter').innerText = "0 / 350 từ";
    
    if (globalBilingualMode) {
        translationBox.classList.remove('hidden');
    } else {
        translationBox.classList.add('hidden');
    }
}

function updateWritingContent(textarea) {
    const text = textarea.value;
    writingAnswerText = text;
    
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const counter = document.getElementById('wordCounter');
    counter.innerText = `${words} / 350 từ`;

    if (words > 350) {
        counter.className = "px-3 py-1 bg-rose-950/40 border border-rose-800 rounded-full text-rose-400 text-xs font-bold animate-pulse";
        const trimmed = text.trim().split(/\s+/).slice(0, 350).join(" ");
        textarea.value = trimmed;
        writingAnswerText = trimmed;
        
        textarea.classList.add('border-rose-500', 'focus:border-rose-500');
        textarea.classList.remove('border-slate-800', 'border-amber-500', 'focus:border-emerald-500/50', 'focus:border-amber-500');
    } else if (words >= 330) {
        counter.className = "px-3 py-1 bg-amber-955/40 border border-amber-800 rounded-full text-amber-400 text-xs font-bold";
        textarea.classList.add('border-amber-500', 'focus:border-amber-500');
        textarea.classList.remove('border-slate-800', 'border-rose-500', 'focus:border-emerald-500/50', 'focus:border-rose-500');
    } else if (words >= 250) {
        counter.className = "px-3 py-1 bg-green-950/40 border border-green-800 rounded-full text-green-400 text-xs font-bold";
        textarea.classList.remove('border-rose-500', 'border-amber-500', 'focus:border-rose-500', 'focus:border-amber-500');
        textarea.classList.add('border-slate-800', 'focus:border-emerald-500/50');
    } else {
        counter.className = "px-3 py-1 bg-[#0b0f19] border border-slate-800 rounded-full text-emerald-400 text-xs font-bold";
        textarea.classList.remove('border-rose-500', 'border-amber-500', 'focus:border-rose-500', 'focus:border-amber-500');
        textarea.classList.add('border-slate-800', 'focus:border-emerald-500/50');
    }
    
    // Tự động lưu tiến trình
    saveProgressToLocalStorage();
}
