USE [Master]

/****** Object:  Database [FAIVE_CAPSTONE]    Script Date: 2023-10-24 9:52:28 AM ******/
CREATE DATABASE [FAIVE_CAPSTONE]
 
USE [FAIVE_CAPSTONE]
GO

/****** Object:  Table [dbo].[Candidate]    Script Date: 2023-10-24 9:47:02 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Candidate](
	[ID] [int] IDENTITY(100001,1) NOT NULL,
	[CandidateName] [varchar](40) NOT NULL,
	[EmailID] [varchar](40) NOT NULL,
	[PersonalityScore] [int] NULL,
	[AptitudeScore] [int] NULL,
	[LoginPassword] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[EmailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

--DROP TABLE Candidate

/****** Object:  Table [dbo].[HRExecutive]    Script Date: 2023-10-24 9:48:08 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[HRExecutive](
	[ID] [int] IDENTITY(900001,1) NOT NULL,
	[HRName] [varchar](40) NOT NULL,
	[EmailID] [varchar](40) NOT NULL,
	[LoginPassword] [varchar](40) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[EmailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

--DROP TABLE HRExecutive

/****** Object:  Table [dbo].[JobPosting]    Script Date: 2023-10-24 9:49:19 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[JobPosting](
	[ID] [int] IDENTITY(500001,1) NOT NULL,
	[HRID] [int] NULL,
	[Title] [varchar](40) NOT NULL,
	[JobLocation] [varchar](40) NULL,
	[PostedDate] [date] NOT NULL,
	[LastDate] [date] NOT NULL,
	[Wages] [int] NULL,
	[Skills] [varchar](1) NULL,
	[Personality] [varchar](1) NULL,
	[Education] [varchar](1) NULL,
	[Experience] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[JobPosting]  WITH CHECK ADD FOREIGN KEY([HRID])
REFERENCES [dbo].[HRExecutive] ([ID])
GO

--DROP TABLE JobPosting

/****** Object:  Table [dbo].[JobCandidate]    Script Date: 2023-10-24 9:49:58 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[JobCandidate](
	[JobID] [int] NULL,
	[CandidateID] [int] NULL,
	[FitmentRank] [int] NULL,
	[MatchPercent] [decimal](3, 2) NULL,
	[CandidateStatus] [varchar](1) NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[JobCandidate]  WITH CHECK ADD FOREIGN KEY([CandidateID])
REFERENCES [dbo].[Candidate] ([ID])
GO

ALTER TABLE [dbo].[JobCandidate]  WITH CHECK ADD FOREIGN KEY([JobID])
REFERENCES [dbo].[JobPosting] ([ID])
GO

--DROP TABLE JobCandidate

/****** Object:  Table [dbo].[CandidateResume]    Script Date: 2023-10-24 9:51:57 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CandidateResume](
	[CandidateID] [int] NULL,
	[Skills] [varchar](1) NULL,
	[Personality] [varchar](1) NULL,
	[Education] [varchar](1) NULL,
	[Experience] [int] NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CandidateResume]  WITH CHECK ADD FOREIGN KEY([CandidateID])
REFERENCES [dbo].[Candidate] ([ID])
GO

--DROP TABLE CandidateResume