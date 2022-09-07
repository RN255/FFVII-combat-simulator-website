document.addEventListener("DOMContentLoaded", () => {
  const CloudHpDisplay = document.getElementById("cloudHp");
  const CloudMpDisplay = document.getElementById("cloudMp");
  const SepHpDisplay = document.getElementById("sepHp");
  const SepMpDisplay = document.getElementById("sepMp");
  let win = false;

  addEventListener("load", startgame);

  document.getElementById("attack").addEventListener("click", attack);
  document.getElementById("fire").addEventListener("click", fire);
  document.getElementById("cure").addEventListener("click", cure);
  document.getElementById("scan").addEventListener("click", scan);

  document.getElementById("playAgain").addEventListener("click", playAgain);

  function startgame() {
    CloudHpDisplay.innerHTML = cloud.hp;
    document.getElementById("cloudHpafter").style.width =
      (cloud.hp / cloud.maxhp) * 100 + "%";
    CloudMpDisplay.innerHTML = cloud.mp;
    document.getElementById("cloudMpafter").style.width =
      (cloud.mp / cloud.maxmp) * 100 + "%";
    SepHpDisplay.innerHTML = sephiroth.hp;
    document.getElementById("sepHpafter").style.width =
      (sephiroth.hp / sephiroth.maxhp) * 100 + "%";
    SepMpDisplay.innerHTML = sephiroth.mp;
    document.getElementById("sepMpafter").style.width =
      (sephiroth.mp / sephiroth.maxmp) * 100 + "%";
  }

  function attack() {
    sephiroth.hp -= 15;
    SepHpDisplay.innerHTML = sephiroth.hp;
    document.getElementById("sepHpafter").style.width =
      (sephiroth.hp / sephiroth.maxhp) * 100 + "%";
    document.getElementById("announcement").innerHTML = "Cloud atacks!";
    checkWin();
    checkMp();
    setTimeout(sephirothMove, 1500);
  }

  function fire() {
    sephiroth.hp -= 25;
    cloud.mp -= 25;
    SepHpDisplay.innerHTML = sephiroth.hp;
    document.getElementById("sepHpafter").style.width =
      (sephiroth.hp / sephiroth.maxhp) * 100 + "%";
    CloudMpDisplay.innerHTML = cloud.mp;
    document.getElementById("cloudMpafter").style.width =
      (cloud.mp / cloud.maxmp) * 100 + "%";
    document.getElementById("announcement").innerHTML =
      "Cloud atacks with fire!";
    checkWin();
    checkMp();
    setTimeout(sephirothMove, 1500);
  }

  function cure() {
    if (cloud.hp >= cloud.maxhp - 50) {
      cloud.hp = cloud.maxhp;
    } else {
      cloud.hp += 50;
    }
    cloud.mp -= 15;
    CloudHpDisplay.innerHTML = cloud.hp;
    document.getElementById("cloudHpafter").style.width =
      (cloud.hp / cloud.maxhp) * 100 + "%";
    CloudMpDisplay.innerHTML = cloud.mp;
    document.getElementById("cloudMpafter").style.width =
      (cloud.mp / cloud.maxmp) * 100 + "%";
    document.getElementById("announcement").innerHTML = "Cloud heals!";
    checkWin();
    checkMp();
    setTimeout(sephirothMove, 1500);
  }

  function scan() {
    cloud.mp -= 5;
    CloudMpDisplay.innerHTML = cloud.mp;
    document.getElementById("cloudMpafter").style.width =
      (cloud.mp / cloud.maxmp) * 100 + "%";
    document.getElementById("announcement").innerHTML =
      "Sephiroth is weak against " + sephiroth.weak + "!";
    checkWin();
    checkMp();
    setTimeout(sephirothMove, 2000);
  }

  // sephiroth's move
  function sephirothMove() {
    if (sephiroth.hp > 0) {
      const choices = [SepAttack];

      if (sephiroth.mp >= 25 && sephiroth.hp <= sephiroth.hp - 50) {
        choices.push(SepIce, SepFire, SepCure);
      } else if (sephiroth.mp >= 25) {
        choices.push(SepIce, SepFire);
      }

      let choice = choices[Math.floor(Math.random() * choices.length)];
      choice();

      function SepAttack() {
        cloud.hp -= 15;
        CloudHpDisplay.innerHTML = cloud.hp;
        document.getElementById("cloudHpafter").style.width =
          (cloud.hp / cloud.maxhp) * 100 + "%";
        document.getElementById("announcement").innerHTML =
          "Sephiroth attacks!";
        checkWin();
      }

      function SepIce() {
        cloud.hp -= 12;
        sephiroth.mp -= 25;
        CloudHpDisplay.innerHTML = cloud.hp;
        document.getElementById("cloudHpafter").style.width =
          (cloud.hp / cloud.maxhp) * 100 + "%";
        SepMpDisplay.innerHTML = sephiroth.mp;
        document.getElementById("sepMpafter").style.width =
          (sephiroth.mp / sephiroth.maxmp) * 100 + "%";
        document.getElementById("announcement").innerHTML =
          "Sephiroth attacks with ice!";
        checkWin();
      }

      function SepFire() {
        cloud.hp -= 17;
        sephiroth.mp -= 25;
        CloudHpDisplay.innerHTML = cloud.hp;
        document.getElementById("cloudHpafter").style.width =
          (cloud.hp / cloud.maxhp) * 100 + "%";
        SepMpDisplay.innerHTML = sephiroth.mp;
        document.getElementById("sepMpafter").style.width =
          (sephiroth.mp / sephiroth.maxmp) * 100 + "%";
        document.getElementById("announcement").innerHTML =
          "Sephiroth attacks with fire!";
        checkWin();
      }

      function SepCure() {
        if (sephiroth.hp >= sephiroth.maxhp - 25) {
          sephiroth.hp = sephiroth.maxhp;
        } else {
          sephiroth.hp += 25;
        }
        sephiroth.mp -= 25;
        SepHpDisplay.innerHTML = sephiroth.hp;
        document.getElementById("sepHpafter").style.width =
          (sephiroth.hp / sephiroth.maxhp) * 100 + "%";
        SepMpDisplay.innerHTML = sephiroth.mp;
        document.getElementById("sepMpafter").style.width =
          (sephiroth.mp / sephiroth.maxmp) * 100 + "%";
        document.getElementById("announcement").innerHTML = "Sephiroth heals!";
        checkWin();
      }
    }
  }

  function checkWin() {
    if (cloud.hp <= 0) {
      CloudHpDisplay.innerHTML = 0;
      document.getElementById("cloudHpafter").style.width = "0%";
      document.getElementById("announcement").innerHTML = "Sephiroth wins!";
      disableInput();
      document.getElementById("playAgain").style.display = "inline";
    } else if (sephiroth.hp <= 0) {
      SepHpDisplay.innerHTML = 0;
      document.getElementById("sepHpafter").style.width = "0%";
      document.getElementById("announcement").innerHTML = "Cloud wins!";
      disableInput();
      document.getElementById("playAgain").style.display = "inline";
    }
  }

  function playAgain() {
    document.getElementById("playAgain").style.display = "none";

    sephiroth.hp = sephiroth.maxhp;
    SepHpDisplay.innerHTML = sephiroth.hp;
    document.getElementById("sepHpafter").style.width =
      (sephiroth.hp / sephiroth.maxhp) * 100 + "%";

    sephiroth.mp = sephiroth.maxmp;
    SepMpDisplay.innerHTML = sephiroth.mp;
    document.getElementById("sepMpafter").style.width =
      (sephiroth.mp / sephiroth.maxmp) * 100 + "%";

    cloud.hp = cloud.maxhp;
    CloudHpDisplay.innerHTML = cloud.hp;
    document.getElementById("cloudHpafter").style.width =
      (cloud.hp / cloud.maxhp) * 100 + "%";

    cloud.mp = cloud.maxmp;
    CloudMpDisplay.innerHTML = cloud.mp;
    document.getElementById("cloudMpafter").style.width =
      (cloud.mp / cloud.maxmp) * 100 + "%";

    enableInput();
  }

  function checkMp() {
    if (cloud.mp < 25) {
      document.getElementById("fire").removeEventListener("click", fire);
      document.getElementById("cure").removeEventListener("click", cure);
      document.getElementById("scan").removeEventListener("click", scan);
    }
  }

  function disableInput() {
    document.getElementById("attack").removeEventListener("click", attack);
    document.getElementById("fire").removeEventListener("click", fire);
    document.getElementById("cure").removeEventListener("click", cure);
    document.getElementById("scan").removeEventListener("click", scan);
  }

  function enableInput() {
    document.getElementById("attack").addEventListener("click", attack);
    document.getElementById("fire").addEventListener("click", fire);
    document.getElementById("cure").addEventListener("click", cure);
    document.getElementById("scan").addEventListener("click", scan);
  }

  // create players
  class Player {
    constructor(className, Hp, Mp, WeakAgainst) {
      this.className = className;
      this.maxhp = Hp;
      this.hp = Hp;
      this.maxmp = Mp;
      this.mp = Mp;
      this.weak = WeakAgainst;
    }
  }

  let cloud = new Player("Cloud", 100, 150, "Ice");
  let sephiroth = new Player("Sephiroth", 150, 100, "Fire");
});
