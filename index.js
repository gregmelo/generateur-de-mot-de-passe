import { prompt } from "./prompt.js";

function generateRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

console.log("Bienvenue dans le générateur de mot de passe !\n");
console.log(
  "Règles :\n" +
    "Le système générera un mot de passe aléatoire en fonction : .\n" +
    "- Du nombre de caractères que vous aureé choisis (entre 8 et 36 caractères).\n" +
    "- Si vous souhaitez ou non des caractères spéciaux.\n" +
    "- Si vous souhaitez ou non des chiffres.\n" +
    "- Si vous souhaitez ou non des majuscules.\n\n" +
    "Commençons ! 🚀\n\n"
);

// Fonction pour valider si le nombre entré par l'utilisateur est valide
function isValidNumber(number) {
  if (Number.isNaN(number) || number < 8 || number > 36) {
    console.log(
      "Erreur : le nombre de caractères doit être compris entre 8 et 36"
    );
    return false;
  }
  return true;
}

// Fonction pour vérifier si l'utilisateur répond bien par y ou n
function promptYesNoQuestion(question) {
  let response;
  do {
    response = prompt(question).toLowerCase();
    if (response !== "y" && response !== "n") {
      console.log("Erreur : Veuillez répondre par 'y' ou 'n'.");
    }
  } while (response !== "y" && response !== "n");
  return response === "y";
}

// Fonction pour vérifier si le mot de passe contient bien les demande de l'utilisateur
function isValidPassword(
  password,
  includeSpecial,
  includeNumbers,
  includeUppercase
) {
  if (includeSpecial && !/[!@#$%^&*()_+=<>?-]/.test(password)) {
    return false;
  }

  if (includeNumbers && !/\d/.test(password)) {
    return false;
  }

  if (includeUppercase && !/[A-Z]/.test(password)) {
    return false;
  }

  return true;
}

// Fonction pour demander à l'utilisateur d'entrer un nombre de caractères valide
function promptNumberOfCharacters() {
  let number;
  do {
    number = Number(prompt("Combien de caractères souhaitez vous ? (8-36)"));
  } while (!isValidNumber(number));
  return number;
}

function generatePassword() {
  let password;
  let includeSpecialCharacters;
  let includeNumbers;
  let includeUppercase;

  do {
    // Demander le nombre de caractères
    let numberOfCharacters = promptNumberOfCharacters();

    // Demander si l'utilisateur souhaite des caractères spéciaux
    includeSpecialCharacters = promptYesNoQuestion(
      "Voulez-vous inclure des caractères spéciaux ? (y/n)"
    );

    // Demander si l'utilisateur souhaite des chiffres
    includeNumbers = promptYesNoQuestion(
      "Voulez-vous inclure des chiffres ? (y/n)"
    );

    // Demander si l'utilisateur souhaite des majuscules
    includeUppercase = promptYesNoQuestion(
      "Voulez-vous inclure des majuscules ? (y/n)"
    );

    // Générer le mot de passe en fonction des réponses de l'utilisateur
    password = generateRandomPassword(
      numberOfCharacters,
      includeSpecialCharacters,
      includeNumbers,
      includeUppercase
    );

    // Vérifier si le mot de passe généré est valide
    if (
      !isValidPassword(
        password,
        includeSpecialCharacters,
        includeNumbers,
        includeUppercase
      )
    ) {
      console.log(
        "Erreur : Le mot de passe généré ne répond pas aux critères spécifiés. Regénération..."
      );
    }
  } while (
    !isValidPassword(
      password,
      includeSpecialCharacters,
      includeNumbers,
      includeUppercase
    )
  );

  // Afficher le mot de passe généré
  console.log("Mot de passe généré :", password);
}

function generateRandomPassword(
  length,
  includeSpecial,
  includeNumbers,
  includeUppercase
) {
  // Définir les caractères possibles en fonction des critères de l'utilisateur
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const specialChars = "!@#$%^&*()_+=<>?-";
  const numberChars = "0123456789";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let allChars = lowercaseChars;

  if (includeSpecial) {
    allChars += specialChars;
  }

  if (includeNumbers) {
    allChars += numberChars;
  }

  if (includeUppercase) {
    allChars += uppercaseChars;
  }

  // Générer le mot de passe aléatoire
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = generateRandomNumber(0, allChars.length);
    password += allChars.charAt(randomIndex);
  }

  return password;
}

// Démarrer la génération du mot de passe
generatePassword();
