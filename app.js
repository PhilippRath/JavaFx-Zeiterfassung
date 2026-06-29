document.addEventListener("DOMContentLoaded", () => {
    const chapterList = document.getElementById("chapter-list");
    const articleContainer = document.getElementById("article-container");
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const themeText = document.getElementById("theme-text");
    
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    let currentChapterIndex = 0;

    // 1. Initialisiere Sidebar (Kapitelübersicht)
    function initSidebar() {
        chapterList.innerHTML = "";
        chapters.forEach((chapter, index) => {
            const li = document.createElement("li");
            
            const btn = document.createElement("button");
            btn.className = "chapter-item-btn";
            if (index === currentChapterIndex) btn.classList.add("active");
            btn.setAttribute("aria-label", `Kapitel ${chapter.num}: ${chapter.title}`);
            
            // Checkbox für Lernfortschritt
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "progress-checkbox";
            checkbox.title = "Als abgeschlossen markieren";
            checkbox.setAttribute("aria-label", `Kapitel ${chapter.num} als abgeschlossen markieren`);
            
            // Lese Zustand aus LocalStorage
            const isCompleted = localStorage.getItem(`chapter_completed_${chapter.id}`) === "true";
            checkbox.checked = isCompleted;
            
            checkbox.addEventListener("change", (e) => {
                localStorage.setItem(`chapter_completed_${chapter.id}`, e.target.checked);
                e.stopPropagation(); // Verhindert, dass der Button-Klick ausgelöst wird
            });

            const textSpan = document.createElement("span");
            textSpan.textContent = `${chapter.num}. ${chapter.title}`;
            textSpan.style.flexGrow = "1";
            textSpan.style.textAlign = "left";

            // Zusammenbauen
            btn.appendChild(checkbox);
            btn.appendChild(textSpan);
            
            btn.addEventListener("click", () => {
                selectChapter(index);
            });

            li.appendChild(btn);
            chapterList.appendChild(li);
        });
    }

    // 2. Kapitel auswählen und anzeigen
    function selectChapter(index) {
        if (index < 0 || index >= chapters.length) return;
        
        currentChapterIndex = index;
        const chapter = chapters[index];

        // Content aktualisieren
        articleContainer.innerHTML = chapter.content;

        // Active State in Sidebar aktualisieren
        const buttons = chapterList.querySelectorAll(".chapter-item-btn");
        buttons.forEach((btn, idx) => {
            if (idx === index) {
                btn.classList.add("active");
                btn.setAttribute("aria-current", "page");
            } else {
                btn.classList.remove("active");
                btn.removeAttribute("aria-current");
            }
        });

        // Scrollen zum Anfang des Artikels
        document.querySelector(".content-area").scrollTop = 0;

        // Navigation Buttons steuern
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === chapters.length - 1;

        // Fokus auf die H1 des Artikels setzen (für Screenreader/Barrierefreiheit)
        const h1 = articleContainer.querySelector("h1");
        if (h1) {
            h1.setAttribute("tabindex", "-1");
            h1.focus();
        }
    }

    // 3. Navigation Buttons Events
    prevBtn.addEventListener("click", () => {
        if (currentChapterIndex > 0) {
            selectChapter(currentChapterIndex - 1);
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentChapterIndex < chapters.length - 1) {
            selectChapter(currentChapterIndex + 1);
        }
    });

    // 4. Dark / Light Mode Toggle
    function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        updateThemeUI(savedTheme);
    }

    function updateThemeUI(theme) {
        if (theme === "dark") {
            themeIcon.textContent = "☀️";
            themeText.textContent = "Hell";
            themeToggleBtn.setAttribute("aria-label", "Zu hellem Design wechseln");
        } else {
            themeIcon.textContent = "🌙";
            themeText.textContent = "Dunkel";
            themeToggleBtn.setAttribute("aria-label", "Zu dunklem Design wechseln");
        }
    }

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeUI(newTheme);
    });

    // 5. App starten
    initTheme();
    initSidebar();
    selectChapter(0);
});
