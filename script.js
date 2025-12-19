// assets/script.js
// Shared utilities: GSAP page transitions and safe streamer starter.
// Include GSAP CDN in pages (each HTML has a <script src="https://cdnjs.cloudflare.com/.../gsap.min.js"></script>)

(function(){
  // safe DOM helpers
  function $(sel){return document.querySelector(sel)}
  function $all(sel){return Array.from(document.querySelectorAll(sel))}

  // Page intro animation (GSAP) - if available
  function introAnim(){
    if (typeof gsap !== 'undefined') {
      try {
        gsap.from("header", {y:-20, opacity:0, duration:0.6, ease:"power2.out"});
        gsap.from(".container > *:not(header)", {y:12, opacity:0, duration:0.7, stagger:0.12, delay:0.08, ease:"power2.out"});
      } catch(e){/*ignore*/}
    }
  }

  document.addEventListener('DOMContentLoaded', introAnim);

  // Intercept internal navigation links to animate out then navigate
  $all('a[href]').forEach(a=>{
    const href = a.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
      a.addEventListener('click', function(e){
        e.preventDefault();
        const href = this.getAttribute('href');
        if (typeof gsap !== 'undefined') {
          gsap.to("body", {opacity:0, duration:0.45, onComplete: ()=> window.location = href});
        } else {
          window.location = href;
        }
      });
    }
  });

  // STREAMER starter - only run if #streamSummary exists

// STREAMER starter
function startStreamerIfPresent(){
  const el = $('#streamSummary');
  if(!el) return;

  if (el.__streamerAttached) return;
  el.__streamerAttached = true;


 const summaryLines = [
  `Result-driven IT Leader with <span>9+ years</span> of proven experience delivering scalable and high-impact solutions across <span>AI</span>, <span>Machine Learning</span>, <span>Deep Learning</span>, <span>RPA</span>, <span>Agentic AI</span>, and <span>Enterprise Automation</span>.`,

  `Began career as a <span>Java Backend Developer</span> and advanced into <span>RPA, AI & ML Engineering</span>; currently serving as a <span>Lead Identity Engineer</span> guiding a cross-functional team of <span>14 engineers</span> and collaborating directly with the <span>Vice President – Technology</span>.`,

  `Delivered <span>150+ production-ready automations</span> leveraging <span>UiPath</span> and <span>Power Automate</span>, engineered <span>15+ custom RE-Frameworks</span>, and defined automation strategy supporting <span>250+ enterprise applications</span>.`,

  `Hands-on expertise in designing and deploying advanced <span>AI/ML models</span>, specializing in Regression, Classification, SVM, Ensemble Models, PCA, Clustering, CNN, DNN, Transfer Learning, Object Detection (YOLO, RCNN, SSD), NLP Transformers, and Agentic AI platforms such as <span>OpenAI SDK</span>, <span>Crew AI</span>, <span>LangGraph</span>, <span>MCP</span>, and <span>MS Autogen</span>.`,

  `Extensive experience across the complete ML lifecycle — <span>EDA</span>, <span>Feature Engineering</span>, <span>Model Training & Hyperparameter Tuning</span> (Grid Search / Randomized Search), <span>Cross-Validation</span>, <span>Scaling</span>, <span>SMOTE / T-link balancing</span>, <span>Model Evaluation</span>, and deployment using <span>Docker</span> and <span>Kubernetes</span>.`,

  `Designed and implemented multiple industry-grade AI solutions including <span>Medical Disease Classification</span>, <span>Loan Approval Prediction</span>, <span>Customer Churn Forecasting</span>, <span>Semiconductor Feature Engineering</span>, <span>Aviation Price Prediction</span>, <span>Autonomous Vehicle Vision Processing</span>, <span>Botanical Classification</span>, <span>Signal Quality Prediction</span>, and a <span>Custom Transformer</span> for German-English translation.`,

  `Led enterprise AI initiatives such as <span>Identity Access Growth Forecasting</span> using <span>Lasso/Ridge</span>, <span>Privileged Account Misuse Prediction</span> using <span>SVR</span>, <span>AI-driven Document Understanding</span>, and an <span>Enterprise Chatbot</span> for JRequest ticketing automation.`,

  `Delivered high-impact RPA programs for global clients including <span>Simeio Development</span>, <span>Volvo Group</span>, <span>Arrow Electronics</span>, <span>Ascendum Solutions</span>, <span>TekSystems</span>, and <span>Stackvia Technologies</span>, across SAP, Mainframe, Web and Citrix environments.`,

  `Strong technical proficiency in <span>Python</span>, <span>Docker</span>, <span>Power BI</span>, <span>SQL (MySQL / MS SQL)</span>, <span>Google & Azure Cloud</span>, <span>Git / TFS / Bitbucket</span>, <span>Document Understanding</span>, <span>AI Center</span>, <span>LINQ</span>, <span>Power Query</span>, <span>JIRA</span>, and <span>ServiceNow</span>.`,

  `<span>Strategic thinker and collaborative leader</span> with a track record of driving automation and AI transformation initiatives that improve operational efficiency, accelerate delivery, and significantly enhance business ROI.`
].map(x => x.trim());



let i = 0;
function streamLine(){
  if(i < summaryLines.length){
    const ul = document.querySelector("#streamSummary");
    ul.innerHTML += `<li>${summaryLines[i]}</li>`;
    i++;
    setTimeout(streamLine, 700);
  }
}
setTimeout(streamLine, 250);
  
  
//   `
// <span>Result-driven IT Leader</span> with <span>9+ years</span> experience in AI, ML, RPA & Enterprise Automation.
// Started as Java Backend Developer → progressed to Lead Identity Engineer delivering <span>150+ automations</span> & <span>15+ RE-Frameworks</span>.
// Built <span>ML/DL</span> systems, <span>Agentic Automation</span>, and enterprise RPA ecosystems. Delivered solutions for <span>Simeio, Volvo, Arrow, Ascendum, TekSystems & Stackvia</span>.
//   `.trim();

  const tokens = summaryHTML.split(' ');
  let idx = 0, completed = false;

  function streamWord(){
    if (idx < tokens.length) {
      el.innerHTML += tokens[idx] + ' ';

      // GSAP pulse animation on each word
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(el, {opacity:0.4}, {opacity:1, duration:0.2, ease:"power2.out"});
      }

      idx++;
      el.__timer = setTimeout(streamWord, 80);
    } else {
      completed = true;
      const full = $('#fullSummary');
      full.innerHTML = summaryHTML;
      full.style.opacity = "0.38";
    }
  }

  el.addEventListener('click',()=>{
    if (!completed) {
      clearTimeout(el.__timer);
      el.innerHTML = summaryHTML + ' ';
      completed = true;
      $('#fullSummary').innerHTML = summaryHTML;
    } else {
      el.innerHTML = '';
      $('#fullSummary').innerHTML = '';
      idx = 0; completed = false;
      setTimeout(streamWord, 120);
    }
  });

    // start once
    setTimeout(streamWord, 250);
  }

  document.addEventListener('DOMContentLoaded', startStreamerIfPresent);

})();

//   setTimeout(streamWord, 250);
// }

//   function startStreamerIfPresent(){
//     const el = $('#streamSummary');
//     if(!el) return;

//     // Avoid double-define if script loaded multiple times
//     if (el.__streamerAttached) return;
//     el.__streamerAttached = true;

//     // summary content (kept shorter for hero streaming)
//     const summaryHTML = `
// Result-driven <span>IT Leader</span> with <span>9+ years</span> experience across AI, ML, RPA and Enterprise Automation.
// Started as Java backend dev and advanced to Lead Identity Engineer, delivering 150+ automations and 15+ RE-Frameworks.
// Built ML & DL solutions (CNNs, Transformers), agentic automation integrations, and enterprise-scale RPA ecosystems.
// Delivered solutions for Simeio, Volvo, Arrow, Ascendum, TekSystems and Stackvia.
//     `.trim();

//     // word-by-word streamer (supports inline <span> highlights)
//     // We split by spaces but keep tags together by replacing tags temporarily
//     const TAG_OPEN = '<<<TAGOPEN>>>';
//     const TAG_CLOSE = '<<<TAGCLOSE>>>';
//     let tmp = summaryHTML.replace(/<span/g, TAG_OPEN+'<span').replace(/<\/span>/g, '</span>'+TAG_CLOSE);
//     const tokens = tmp.split(' ');
//     let idx = 0, completed=false;

//     function streamWord(){
//       if (idx < tokens.length){
//         // restore tags when present
//         const token = tokens[idx].replace(new RegExp(TAG_OPEN,'g'),'').replace(new RegExp(TAG_CLOSE,'g'),'');
//         el.innerHTML += token + ' ';
//         idx++;
//         el.scrollIntoView({behavior:'smooth', block:'nearest'});
//         el.__timer = setTimeout(streamWord, 60);
//       } else {
//         completed = true;
//         // show full below (if exists)
//         const full = $('#fullSummary');
//         if(full){ full.innerHTML = summaryHTML; full.style.display='block' }
//       }
//     }

//     // handle click to complete / restart
//     el.addEventListener('click', function(){
//       if (!completed){
//         // finish instantly
//         clearTimeout(el.__timer);
//         el.innerHTML = summaryHTML + ' ';
//         completed = true;
//         const full = $('#fullSummary'); if(full){ full.innerHTML = summaryHTML; full.style.display='block' }
//       } else {
//         // restart
//         el.innerHTML = '';
//         if ($('#fullSummary')) $('#fullSummary').style.display = 'none';
//         idx = 0; completed=false;
//         clearTimeout(el.__timer);
//         setTimeout(streamWord, 120);
//       }

