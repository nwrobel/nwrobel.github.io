/**
 * Javascript file containing additional code to make the webpage work beyond the functionality
 * provided by the website template.
 * 
 * Author: Nick Wrobel
 */

hideAllSkills = function() {
    var allSkills = document.getElementsByClassName("skill");
    for (let skillElement of allSkills) {
      skillElement.style.display = 'none';
    }
  }

getSkillsByCategory = function(categoryBtnId) {
    if (categoryBtnId == 'allSkillsBtn') {
        var allSkills = []
        allSkills = allSkills.concat(SKILLS_DATA.languages);
        allSkills = allSkills.concat(SKILLS_DATA.frameworks);
        allSkills = allSkills.concat(SKILLS_DATA.software);
        allSkills = allSkills.concat(SKILLS_DATA.development);

        return allSkills;

    } else if (categoryBtnId == 'langSkillsBtn') {
        return SKILLS_DATA.languages;

    } else if (categoryBtnId == 'frameworkSkillsBtn') {
        return SKILLS_DATA.frameworks;

    } else if (categoryBtnId == 'softwareSkillsBtn') {
        return SKILLS_DATA.software;

    } else if (categoryBtnId == 'devSkillsBtn') {
        return SKILLS_DATA.development;

    } else {
        throw "Cannot return skills list: the given category button id is invalid";
    }
}

function compareSkills(skillA, skillB) {
  return (skillB.expRating - skillA.expRating);
}

renderSkillToElement = function(skill, colNumber) {
    var outerDiv = document.createElement("div"); 
    outerDiv.className = "skill";

    var skillNameLabel = document.createElement("span");
    skillNameLabel.textContent = skill.name;
    skillNameLabel.id = "skillNameLabel";

    var skillYrsLabel =  document.createElement("span");
    skillYrsLabel.textContent = skill.expYears + ' yr';
    skillYrsLabel.className = "pull-right";
    skillYrsLabel.id = "skillExpLabel";

    var progressDiv = document.createElement("div"); 
    progressDiv.className = "progress";

    var progressBarDiv = document.createElement("div"); 
    progressBarDiv.className = "progress-bar";
    progressBarDiv.role = "progressbar";

    percent = (skill.expRating / 10) * 100
    progressBarDiv.style.width = percent + "%";
    progressBarDiv.textContent = skill.expRating

    outerDiv.appendChild(skillNameLabel);
    outerDiv.appendChild(skillYrsLabel);
    outerDiv.appendChild(progressDiv); 
    progressDiv.appendChild(progressBarDiv);

    if (colNumber == 0) {
        colId = "skillsLeftCol"
    } else if (colNumber == 1) {
        colId = "skillsMiddleCol"
    } else if (colNumber == 2) {
        colId = "skillsRightCol"
    } else {
        throw "Unable to display skill: Invalid column ID"
    }


    document.getElementById(colId).appendChild(outerDiv);
}

displaySkills = function(categoryBtnClickedId) {
    // Hide all skills first
    hideAllSkills();

    // Get skills data for just the skills that match the category
    var skills = getSkillsByCategory(categoryBtnClickedId);

    skills = skills.sort(compareSkills);

    currentSkillsCol = 0;
    skills.forEach(function (skill) {
        renderSkillToElement(skill, currentSkillsCol);
        currentSkillsCol += 1;
        currentSkillsCol = currentSkillsCol % 3;
    });
}

// Show all skills by default when page loads
displaySkills('allSkillsBtn');