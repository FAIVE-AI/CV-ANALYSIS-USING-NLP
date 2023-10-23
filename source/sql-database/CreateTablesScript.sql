CREATE TABLE Candidate (
	ID INT IDENTITY(100001,1) PRIMARY KEY,
	CandidateName VARCHAR(40) NOT NULL,
	EmailID VARCHAR(40) UNIQUE NOT NULL,
	PersonalityScore INT,
	AptitudeScore INT
);

ALTER TABLE Candidate
ADD LoginPassword VARCHAR(20);

--DROP TABLE Candidate

CREATE TABLE HRExecutive (
	ID INT IDENTITY(900001,1) PRIMARY KEY,
	HRName VARCHAR(40) NOT NULL,
	EmailID VARCHAR(40) UNIQUE NOT NULL
);

--DROP TABLE HRExecutive

CREATE TABLE JobPosting (
	ID INT IDENTITY(500001,1) PRIMARY KEY,
	HRID INT FOREIGN KEY REFERENCES HRExecutive(ID),
	Title VARCHAR(40) NOT NULL,
	JobLocation VARCHAR(40),
	PostedDate DATE NOT NULL,
	LastDate DATE NOT NULL,
	Wages INT,
	Skills VARCHAR,
	Personality VARCHAR,
	Education VARCHAR,
	Experience INT
);

--DROP TABLE JobPosting

CREATE TABLE JobCandidate (
	JobID INT FOREIGN KEY REFERENCES JobPosting(ID),
	CandidateID INT FOREIGN KEY REFERENCES Candidate(ID),
	FitmentRank INT,
	MatchPercent DECIMAL(3,2),
	CandidateStatus VARCHAR
)

--DROP TABLE JobCandidate

CREATE TABLE CandidateResume (
	CandidateID INT FOREIGN KEY REFERENCES Candidate(ID),
	Skills VARCHAR,
	Personality VARCHAR,
	Education VARCHAR,
	Experience INT
);

--DROP TABLE CandidateResume