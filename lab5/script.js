let data = null;
async function getData(){
  const response = await fetch("data.json");
  data = await response.json();
}

async function wp(){
  await getData();

  const local = localStorage.getItem("data");
  if (local) {
    data = JSON.parse(local);
  }

  z();
}

document.addEventListener('DOMContentLoaded', ()=>{
  wp();
})

document.getElementById('edit').addEventListener('click', e=>{
  e.target.textContent = e.target.textContent === "Edit" ? "Save" : "Edit";
  document.getElementById("cv_location").disabled = !document.getElementById("cv_location").disabled;
  document.getElementById("cv_phone").disabled = !document.getElementById("cv_phone").disabled;
  document.getElementById("cv_email").disabled = !document.getElementById("cv_email").disabled;
  document.getElementById("cv_instagram").disabled = !document.getElementById("cv_instagram").disabled;
})

function reset(){
  localStorage.clear();
  location.reload();
}

function z(){
    document.querySelector(".CV_profile img").src = "photos/profile.png";
    document.getElementById("cv_name").innerText = data.name;
    document.getElementById("cv_title").innerText = data.title;
    document.getElementById("cv_location").value = data.contact[0].text;
    document.getElementById("cv_phone").value = data.contact[1].text;
    document.getElementById("cv_email").value = data.contact[2].text;
    document.getElementById("cv_instagram").value = data.contact[3].text;
    document.getElementById("about_me").innerText = data.profile;

    const skillsList = document.getElementById("resume_skills");
    data.skills.forEach(skill => {
      const li = document.createElement("li");
      li.innerText = skill;
      skillsList.appendChild(li);
    });

    const languagesList = document.getElementById("language_skills");
    data.languages.forEach(language => {
      const li = document.createElement("li");
      li.innerText = language;
      languagesList.appendChild(li);
    });

    const workList = document.getElementById("work");
    data.workExperience.forEach(work => {
      const li = document.createElement("li");
      li.innerHTML = `<div class="info"><p class="semi-bold">${work.title}</p><ul>${work.details.map(d => `<li>${d}</li>`).join('')}</ul></div>`;
      workList.appendChild(li);
    });

    const educationList = document.getElementById("education");
    data.education.forEach(edu => {
      const li = document.createElement("li");
      li.innerHTML = `<div class="date">${edu.period}</div><div class="info"><p class="semi-bold">${edu.school}</p></div>`;
      educationList.appendChild(li);
    });

    
  }
  let workexp = false;
    let eduexp = false;
  function toggleWork() {
    workexp = !workexp;
    const workSection = document.getElementById("work");
    workSection.style.height = workexp ? "auto" : "0";
  }

  function toggleEducation() {
    eduexp = !eduexp;
    const eduSection = document.getElementById("education");
    eduSection.style.height = eduexp ? "auto" : "0";
  }


  function checkform(){
    return document.getElementsByTagName("form")[0].checkValidity();
  }

  function addSkill() {
    const skillName = prompt("New skill");
    if (skillName) {
      const li = document.createElement("li");
      li.innerText = skillName;
      document.getElementById("resume_skills").appendChild(li);
      data.skills.push(skillName);
    }
  }

  function addLanguage() {
    const languageName = prompt("New language");
    if (languageName) {
      const li = document.createElement("li");
      li.innerText = languageName;
      document.getElementById("language_skills").appendChild(li);
      data.languages.push(languageName);
    }
  }

  function save(){
    if(checkform()){
      data.contact[0].text = document.getElementById("cv_location").value;
      data.contact[1].text = document.getElementById("cv_phone").value;
      data.contact[2].text = document.getElementById("cv_email").value;
      data.contact[3].text = document.getElementById("cv_instagram").value;
      localStorage.setItem("data", JSON.stringify(data));
      alert("Saved successfully");
      location.reload();
    } else {
      alert("unsupported format");
    }
  }