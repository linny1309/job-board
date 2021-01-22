/// <reference types="cypress" />

const firstNames = ['Alex',"Bart","Carter","Dan","Ethan","Fred","Greg","Hal","Inder","John","Ken","Linus","Manny","Nathan","Orpheus","Phil","Quinton","Rita","Sam","Talia","Ursula","Vivian","Wanda","Xi","Yasmin","Zoey"];
const lastNames = ['Adams','Baker','Campbell','Dodd','Evans','Fabien','Goddard','Hayes','Irvin','Johnson','Kensworth','Lewis','Madden','Orsen','Peterson','Quebert','Richardson','Stevens','Tobias','Ulmer','Vaughn','White','Xander','Yeager','Zabel']
const states = ['New Jersey','New York'];
const njCities = ['New Brunswick','Newark','Hoboken'];
const nyCities = ['New York','Albany','Syracuse'];
const colleges = ['Rutgers','Montclair','Rider','UCLA','Princeton','Syracuse','RIT','Monmouth','Harvard','Yale'];
const degrees = ['Bachelors','Masters','PhD'];
const majors = ['Computer Science','IT','Economics','Business','Math','Physics','Law','Biology','Communications'];
const minors = ['Computer Science','IT','Economics','Business','Math','Physics','Law','Biology','Communications'];
const organizations = ['Google','Yahoo','Facebook','Microsoft','Amazon','Merck','Shell','Johnson & Johnson'];
const positions = ['Front-end developer','Backend developer','Full-stack developer','BI Analyst','Manager','Database manager'];

//Randomized post
const randomPost = () => {
  var randomState = states[(Math.floor(Math.random() * states.length))];
  var randomCity;
  var randomZip;

  if(randomState == "New Jersey") {
    randomCity = njCities[(Math.floor(Math.random() * njCities.length))];
  }
  else {
    randomCity = nyCities[(Math.floor(Math.random() * nyCities.length))];
  }

  switch(randomCity) {
  case "New Brunswick":
    randomZip = "08901";
  case "Newark":
    randomZip = "07101";
  case "Hoboken":
    randomZip = "07030";
  case "New York":
    randomZip = "10001";
  case "Albany":
    randomZip = "12084";
  case "Syracuse":
    randomZip = "13201";
  }

  var randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  var randomPost = {
    firstName: firstNames[(Math.floor(Math.random() * firstNames.length))],
    lastName: lastNames[(Math.floor(Math.random() * lastNames.length))],
    dob: randomDate(new Date(1900, 0, 1), new Date(2000, 0, 1)),
    state: randomState,
    city: randomCity,
    zip: randomZip,
    institution: colleges[(Math.floor(Math.random() * colleges.length))],
    degree: degrees[(Math.floor(Math.random() * degrees.length))],
    gradYear: randomDate(new Date(1980, 0, 1), new Date(1985, 0, 1)),
    major: majors[(Math.floor(Math.random() * majors.length))],
    minor: minors[(Math.floor(Math.random() * minors.length))],
    org: organizations[(Math.floor(Math.random() * organizations.length))],
    position: positions[(Math.floor(Math.random() * positions.length))],
    jobStart: randomDate(new Date(1990, 0, 1), new Date(2000, 0, 1)),
    jobEnd: randomDate(new Date(2001, 0, 1), new Date(2020, 0, 1)),
    imagePath: "http://localhost:3300/images/jill-waters-1607174826840.png"
}
  return randomPost;
};

describe("MEAN", () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('should show the words MEAN', () => {
    cy.contains("MEAN");
  });

  //Basic menu navigation

  it('should open the menu', () => {
    cy.get('#menuIcon').click();
    cy.wait(700);
  });

  it('should open and close the menu', () => {
    cy.get('#menuIcon').click();
    cy.get('#menuIcon').click();
    cy.wait(700);
  });

  it('should open the menu and navigate to the Login page', () => {
    cy.get('#menuIcon').click();
    cy.contains("Login").click();
    cy.wait(700);
  });

  it('should open the menu and navigate to the Loader page', () => {
    cy.get('#menuIcon').click();
    cy.contains("Loader").click();
    cy.wait(700);
  });

  it('should open the menu and navigate to the Jobs page', () => {
    cy.get('#menuIcon').click();
    cy.contains("Jobs").click();
    cy.wait(700);
  });

  it('should open the menu and navigate to the Documents page', () => {
    cy.get('#menuIcon').click();
    cy.contains("Documents").click();
    cy.wait(700);
  });

  it('should open the menu and navigate to the Visuals page', () => {
    cy.get('#menuIcon').click();
    cy.contains("Visuals").click();
    cy.wait(700);
  });

  //Signing up a user

  it('should create a new user', () => {
    var post = randomPost();

    cy.get('[formControlName=firstName]').type(post.firstName);
    cy.get('[formControlName=lastName]').type(post.lastName);
    cy.get('[formControlName=dob]').type(post.dob.toISOString().substring(0,10));
    cy.get('[formControlName=state]').type(post.city);
    cy.get('[formControlName=city]').type(post.state);
    cy.get('[formControlName=zip]').type(post.zip);
    cy.get('[formControlName=institution]').type(post.institution);
    cy.get('[formControlName=degree]').type(post.degree);
    cy.get('[formControlName=gradYear]').type(post.gradYear.toISOString().substring(0,10));
    cy.get('[formControlName=major]').type(post.major);
    cy.get('[formControlName=org]').type(post.minor);
    cy.get('[formControlName=position]').type(post.position);
    cy.get('[formControlName=jobStart]').type(post.jobStart.toISOString().substring(0,10));
    cy.get('[formControlName=jobEnd]').type(post.jobEnd.toISOString().substring(0,10));
    cy.get('#imageButton').click();

    var blob;

    cy.fixture('circle-purple.png').then(fileContent => {
      return Cypress.Blob.base64StringToBlob(fileContent) })
          .then(fileContentasBlob => {
            blob = (fileContentasBlob)
            cy.get('input[type="file"]')
            .attachFile({
                fileContent: fileContentasBlob,
                fileName: 'circle-purple.png',
                mimeType: 'image/png'
            },{ subjectType: 'input' }
            );
    });

    cy.get("#submitRegistration").click();

    cy.request("POST", 'http://localhost:3300/api/posts', {
      "firstName": post.firstName,
      "lastName": post.lastName,
      "dob": post.dob,
      "state": post.state,
      "city": post.city,
      "zip": post.zip,
      "institution": post.institution,
      "degree": post.degree,
      "gradYear": post.gradYear,
      "major": post.major,
      "minor": post.minor,
      "org": post.org,
      "position": post.position,
      "jobStart": post.jobStart,
      "jobEnd": post.jobEnd,
      "image": ""
      }
    )

  });

});
