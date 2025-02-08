"use client";
import { useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from "next/navigation";
import { MermaidDiagram } from "@lightenna/react-mermaid-diagram";

export const Diagram = ({ diagram }) => {
  const router = useRouter();
  const mermaidContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const modifyDiagram = () => {
      const svgElement = mermaidContainerRef.current?.querySelector("svg");
      if (!svgElement) return;

      console.log("🔄 Modificăm diagrama Mermaid...");

      // 🔹 Eliminăm grid-ul și tick-urile
      svgElement
        .querySelectorAll(".tick, .domain")
        .forEach((el) => el.remove());

      // 📌 Ștergem elementele inutile (linii de grid, today-line)
      removeTodayLine(mermaidContainerRef.current);
      removeGridGroup(mermaidContainerRef.current);

      // 📌 Asigurăm că avem exact 4 secțiuni per categorie
      ensureFourSections(mermaidContainerRef.current);

      // 📌 Ajustăm titlurile secțiunilor
      repositionSectionTitles(mermaidContainerRef.current, 16);

      // 📌 Ajustăm textele task-urilor (centrăm în interiorul task-urilor)

      // 📌 Poziționare corectă a task-urilor în funcție de secțiuni
      const startX = 200; // X inițial pentru primul task
      const startY = 68; // Y inițial pentru prima secțiune
      const spacingX = 170; // Spațiere între task-uri pe axa X
      const spacingY = 96; // Distanță între secțiuni pe axa Y

      let sectionIndex = 0; // Indexul secțiunilor

      while (true) {
        const sectionClass = `section${sectionIndex}`;
        const taskClass = `task${sectionIndex}`;

        // 🔍 Găsim secțiunile și task-urile asociate
        let existingSections = [
          ...svgElement.querySelectorAll(`rect.${sectionClass}`),
        ];
        let tasksInSection = [
          ...svgElement.querySelectorAll(`rect.${taskClass}`),
        ];

        // 📌 Dacă nu există această secțiune, ne oprim
        if (existingSections.length === 0) {
          console.log(`⛔ Nu există ${sectionClass}, ne oprim.`);
          break;
        }

        console.log(
          `🔍 Găsite ${existingSections.length} secțiuni pentru ${sectionClass}`
        );
        console.log(
          `🎯 Găsite ${tasksInSection.length} task-uri pentru ${taskClass}`
        );

        // 📌 Setăm poziția Y de start pentru această secțiune
        let yPosition = startY + sectionIndex * spacingY;
        let xPosition = startX;

        // 📌 Reordonăm task-urile pe linia secțiunii
        tasksInSection.forEach((task, index) => {
          task.setAttribute("x", xPosition);
          task.setAttribute("y", yPosition);

          console.log(
            `📌 Task ${task.getAttribute(
              "id"
            )} repoziționat la x=${xPosition}, y=${yPosition}`
          );

          // 📌 Următorul task trebuie să fie la dreapta
          xPosition += spacingX;
        });

        // 📌 Continuăm la următoarea secțiune
        sectionIndex++;
      }
      adjustSvgWidth(mermaidContainerRef.current);
      repositionTaskTexts(mermaidContainerRef.current, 14);
      // 📌 Adăugăm event listener pe fiecare task pentru click
      const taskElements = [...svgElement.querySelectorAll("rect.task")];
      taskElements.forEach((task) => {
        const taskId = task.getAttribute("id");

        // 📌 Setăm culoarea inițială la alb și suprascriem stilul
        task.style.fill = "white";
        task.style.stroke = "black";
        task.style.pointerEvents = "all";
        task.style.cursor = "pointer";

        task.addEventListener("click", () => {
          task.style.fill = task.style.fill === "red" ? "white" : "red";
          console.log(`🎨 Task ${taskId} schimbat la ${task.style.fill}`);
        });

        console.log(`✅ Event listener adăugat pe task ${taskId}`);
      });

      // ✅ DEBUG: Capturăm click-uri pe tot SVG-ul pentru verificare
      svgElement.addEventListener("click", (event) => {
        console.log("🔥 Click detectat pe SVG!", event.target);

        if (
          event.target.tagName === "rect" &&
          event.target.classList.contains("task")
        ) {
          console.log(`✔️ Confirmat! Click pe task: ${event.target.id}`);
        } else {
          console.log("❌ Click pe altceva decât un task.");
        }
      });

      console.log("🔹 Diagrama realiniată corect:", svgElement.outerHTML);
    };

    // 🛑 Folosim MutationObserver pentru a aștepta generarea completă a SVG-ului
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          modifyDiagram();
          observer.disconnect();
        }
      }
    });

    const svgContainer = mermaidContainerRef.current;
    if (svgContainer) {
      observer.observe(svgContainer, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [diagram]);

  return (
    <TransformWrapper limitToBounds={false} centerOnInit={true}>
      <TransformComponent>
        <div
          className="w-screen h-[calc(100vh_-_64px)] mt-10 "
          ref={mermaidContainerRef}
        >
          <MermaidDiagram>{diagram}</MermaidDiagram>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

const ensureFourSections = (container) => {
  if (!container) {
    console.log("❌ Containerul Mermaid nu a fost găsit!");
    return;
  }

  const svgElement = container.querySelector("svg");
  if (!svgElement) {
    console.log(
      "❌ SVG-ul generat de Mermaid.js nu a fost găsit! Așteptăm generarea..."
    );
    return;
  }

  console.log("🔍 Începem verificarea secțiunilor...");

  const requiredCount = 4; // 🔥 Exact 4 secțiuni per categorie
  const baseY = 50; // 🔥 Primul element începe la y=50
  const sectionSpacing = 24; // 🔥 Distanță între secțiuni
  let sectionIndex = 0; // 📌 Contor pentru secțiuni
  let totalSections = 0; // 📌 Contor pentru numărul total de categorii

  while (true) {
    const sectionClass = `section${sectionIndex}`;
    let existingSections = [
      ...svgElement.querySelectorAll(`rect.${sectionClass}`),
    ];

    // 📌 Dacă nu există secțiuni cu această clasă, ne oprim
    if (existingSections.length === 0) {
      console.log(`⛔ Nu există ${sectionClass}, ne oprim aici.`);
      break;
    }

    console.log(
      `🔍 ${sectionClass}: ${existingSections.length} secțiuni găsite.`
    );
    totalSections++; // 📌 Incrementăm numărul total de categorii

    // 📌 Găsim grupul <g> în care sunt secțiunile curente
    let parentGroup =
      existingSections.length > 0 ? existingSections[0].parentNode : null;
    if (!parentGroup) {
      console.log(
        `❌ Nu s-a găsit un grup <g> pentru ${sectionClass}. Creăm unul nou.`
      );
      parentGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      svgElement.appendChild(parentGroup);
    }

    // 📌 Reordonăm secțiunile existente corect pe axa Y
    existingSections.forEach((section, i) => {
      const correctY = baseY + sectionIndex * 96 + i * sectionSpacing;
      section.setAttribute("y", correctY);
    });

    // 📌 Dacă sunt prea multe secțiuni, le ștergem pe cele în plus
    while (existingSections.length > requiredCount) {
      let sectionToRemove = existingSections.pop();
      sectionToRemove.remove();
      console.log(
        `🗑️ Ștergem excesul: ${sectionClass} -> ${sectionToRemove.outerHTML}`
      );
    }

    // 📌 Dacă sunt prea puține, adăugăm până ajungem la 4
    while (existingSections.length < requiredCount) {
      const newSection = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      newSection.setAttribute("class", `section ${sectionClass}`);
      newSection.setAttribute("height", "24");
      newSection.setAttribute("width", "1430.5");
      newSection.setAttribute("x", "0");

      // 📌 Poziționare corectă
      const yPosition =
        baseY + sectionIndex * 96 + existingSections.length * sectionSpacing;
      newSection.setAttribute("y", yPosition);

      parentGroup.appendChild(newSection);
      existingSections.push(newSection);

      console.log(`➕ Adăugăm secțiune ${sectionClass} la y=${yPosition}`);
    }

    sectionIndex++; // 📌 Trecem la următoarea secțiune (dacă există)
    console.log(
      "📌 Secțiunile finale:",
      [...svgElement.querySelectorAll("rect")].map(
        (rect) => rect.className.baseVal
      )
    );
  }

  // 🔥 Setăm height-ul corect pentru întregul SVG
  const newHeight = baseY + totalSections * 96;
  svgElement.setAttribute("height", newHeight);
  svgElement.setAttribute("viewBox", `0 0 1468 ${newHeight}`);
  console.log(`📏 SVG height ajustat la: ${newHeight}px`);

  console.log("✅ Secțiunile sunt acum corect ajustate și în ordine.");
};

const removeTodayLine = (container) => {
  if (!container) {
    console.log("❌ Containerul Mermaid nu a fost găsit!");
    return;
  }

  const svgElement = container.querySelector("svg");
  if (!svgElement) {
    console.log("❌ SVG-ul generat de Mermaid.js nu a fost găsit!");
    return;
  }

  // 🔹 Selectăm grupul <g class="today"> și îl ștergem
  let todayGroup = svgElement.querySelector("g.today");
  if (todayGroup) {
    console.log("🗑️ Ștergem <g class='today'>...");
    todayGroup.remove();
  }
};
const removeGridGroup = (container) => {
  if (!container) {
    console.log("❌ Containerul Mermaid nu a fost găsit!");
    return;
  }

  const svgElement = container.querySelector("svg");
  if (!svgElement) {
    console.log("❌ SVG-ul generat de Mermaid.js nu a fost găsit!");
    return;
  }

  // 🔹 Selectăm grupul <g class="grid"> și îl ștergem
  let gridGroup = svgElement.querySelector("g.grid");
  if (gridGroup) {
    console.log("🗑️ Ștergem <g class='grid'>...");
    gridGroup.remove();
  }
};
const repositionSectionTitles = (container) => {
  if (!container) {
    console.log("❌ Containerul Mermaid nu a fost găsit!");
    return;
  }

  const svgElement = container.querySelector("svg");
  if (!svgElement) {
    console.log("❌ SVG-ul generat de Mermaid.js nu a fost găsit!");
    return;
  }

  // 🔹 Selectăm toate textele din secțiuni
  let sectionTitles = [
    ...svgElement.querySelectorAll("text[class*='sectionTitle']"),
  ];

  if (sectionTitles.length === 0) {
    console.log("⚠️ Nu s-au găsit titluri de secțiuni!");
    return;
  }

  console.log(
    "🔍 Titluri de secțiuni găsite:",
    sectionTitles.map((t) => t.outerHTML)
  );

  const startY = 96; // 🔥 Primul text începe la y=96
  const spacingY = 96; // 🔥 Fiecare titlu se mută mai jos cu 96

  sectionTitles.forEach((textElement, index) => {
    const newY = startY + index * spacingY;
    textElement.setAttribute("y", newY);

    console.log(
      `📌 Repoziționat ${textElement.textContent.trim()} la y=${newY}`
    );
  });

  console.log("✅ Titlurile de secțiuni au fost repoziționate corect!");
};
const repositionTaskTexts = (container) => {
  if (!container) {
    console.log("❌ Containerul Mermaid nu a fost găsit!");
    return;
  }

  const svgElement = container.querySelector("svg");
  if (!svgElement) {
    console.log("❌ SVG-ul generat de Mermaid.js nu a fost găsit!");
    return;
  }

  console.log("🔄 Repozitionăm textele din task-uri...");

  // 🔹 Selectăm toate textele din task-uri
  let taskTexts = [...svgElement.querySelectorAll("text.taskText")];

  if (taskTexts.length === 0) {
    console.log("⚠️ Nu s-au găsit texte de task-uri!");
    return;
  }

  // 📌 Setăm lățimea fixă a unui task
  const taskWidth = 140;

  taskTexts.forEach((textElement) => {
    const taskId = textElement.getAttribute("id")?.replace("-text", ""); // 🔍 Extragem ID-ul taskului
    const taskRect = svgElement.querySelector(`rect.task[id='${taskId}']`); // 🔍 Găsim task-ul corespunzător

    if (taskRect) {
      const taskX = parseFloat(taskRect.getAttribute("x"));
      const taskY = parseFloat(taskRect.getAttribute("y"));
      const taskHeight = 60; // 📌 Înălțimea unui task

      console.log(
        `🔍 Task-ul pentru textul '${textElement.textContent}' găsit la x=${taskX}, y=${taskY}`
      );

      // 📌 Calculăm noua poziție exactă
      const textX = taskX + taskWidth / 2; // 📌 Centrare pe X
      const textY = taskY + taskHeight / 2; // 📌 Centrare pe Y

      // 📌 Aplicăm noile coordonate
      textElement.setAttribute("x", textX);
      textElement.setAttribute("y", textY);

      // 📌 Setăm ancorarea corectă pentru centrare
      textElement.setAttribute("text-anchor", "middle"); // 📌 Centrare pe X
      textElement.setAttribute("dominant-baseline", "central"); // 📌 Centrare pe Y

      console.log(
        `✅ Repoziționat text '${textElement.textContent.trim()}' la x=${textX}, y=${textY}`
      );
    } else {
      console.log(
        `⚠️ Task-ul pentru textul '${textElement.textContent}' nu a fost găsit!`
      );
    }
  });

  console.log("✅ Textele din task-uri au fost repoziționate corect!");
};
const adjustSvgWidth = (container) => {
  if (!container) {
    console.log("❌ Containerul Mermaid nu a fost găsit!");
    return;
  }

  const svgElement = container.querySelector("svg");
  if (!svgElement) {
    console.log("❌ SVG-ul generat de Mermaid.js nu a fost găsit!");
    return;
  }

  console.log("🔄 Ajustăm lățimea SVG-ului și a secțiunilor...");

  let sections = [...svgElement.querySelectorAll("rect[class*='section']")];
  let maxTasksInSection = 0;

  sections.forEach((section, index) => {
    let sectionClass = `task${index}`;

    let tasksInThisSection = [
      ...svgElement.querySelectorAll(`rect.${sectionClass}`),
    ];

    if (tasksInThisSection.length > maxTasksInSection) {
      maxTasksInSection = tasksInThisSection.length;
    }

    console.log(
      `📌 Secțiunea ${index} (${sectionClass}) are ${tasksInThisSection.length} task-uri`
    );
  });

  // 🛠️ Calcul nou pentru width:
  // 200px (start) + 140px per task + 30px între fiecare task suplimentar + 50px padding extra
  const newWidth =
    200 + maxTasksInSection * 140 + (maxTasksInSection - 1) * 30 + 50;

  // 🔹 Ajustăm width-ul SVG-ului
  svgElement.setAttribute("width", newWidth);
  svgElement.setAttribute(
    "viewBox",
    `0 0 ${newWidth} ${svgElement.getAttribute("height")}`
  );

  // 🔹 Eliminăm `max-width` și setăm `width` corect
  svgElement.style.maxWidth = ""; // Elimină max-width
  svgElement.style.width = `${newWidth}px`; // Setează width

  // 🔹 Ajustăm width-ul fiecărei secțiuni la noul width
  sections.forEach((section) => {
    section.setAttribute("width", newWidth);
    console.log(`📌 Width ajustat pentru secțiune: ${newWidth}px`);
  });

  console.log(
    `✅ SVG width ajustat la: ${newWidth}px (cu 50px extra pentru padding)`
  );
};
