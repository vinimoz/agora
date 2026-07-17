# Agora – Democratic Methods Guide

## 🏛 Introduction

Agora supports multiple democratic participation and voting methods.

Each method was designed for a different purpose and may produce different outcomes even when the same people vote.

There is no universally "best" voting system.

The appropriate method depends on:

- The type of decision

- The number of options

- The need for consensus

- The need for legitimacy

- The risk of strategic voting

- The desired level of participation

This guide explains each method available in Agora.


# 🧠 Understanding Participation vs Voting

Agora distinguishes two concepts:

## Deliberative Participation

Used to:

- Discuss

- React

- Evaluate

- Improve ideas

Examples:

- Binary Support

- Ternary Support

- Majority Judgment

- Star Rating

- Reactions

Goal:

> Understand opinions.


## Formal Voting

Used when a decision must be made.

Examples:

- Condorcet

- Borda

- Approval Voting

- Ranked Choice

- Quadratic Voting

Goal:

> Select a winner.


# 👍 Binary Support

## Principle

Participants answer:

- Yes

- No

Example:

Should a bicycle lane be created?

| **Answer** | **Votes** |
| :-: | :-: |
| Yes | 80 |
| No | 20 |

Result:

80% support.


## Advantages

- Simple

- Easy to understand

- Fast participation

## Limitations

- No nuance

- Does not measure intensity

Best for:

- Petitions

- Referendums

- Simple consultations


# ⚖️ Ternary Support

## Principle

Participants choose:

- For

- Abstain

- Against

Example:

| **Position** | **Votes** |
| :-: | :-: |
| For | 50 |
| Abstain | 20 |
| Against | 30 |


## Advantages

- More nuanced

- Common in assemblies

- Reflects neutrality

Best for:

- Associations

- Councils

- Committees


# ⭐ Star Rating

## Principle

Participants rate options.

Example:

1–5 stars.

| **Option** | **Average** |
| :-: | :-: |
| Park A | 4.6 |
| Park B | 3.8 |


## Advantages

- Familiar

- Easy participation

## Limitations

- Different users interpret stars differently


# 🔢 Score Voting

## Principle

Participants assign a score.

Example:

0–10

| **Option** | **Average Score** |
| :-: | :-: |
| Park A | 8.4 |
| Park B | 6.7 |


## Advantages

- More precise than stars

- Measures intensity


# 🧠 Majority Judgment

## Origin

Developed by:

Michel Balinski and Rida Laraki.


## Principle

Every voter grades every option.

Example grades:

- Excellent

- Very Good

- Good

- Acceptable

- Poor

- Reject


## Example

Candidate A:

| **Grade** | **Votes** |
| :-: | :-: |
| Excellent | 20 |
| Very Good | 30 |
| Good | 40 |
| Acceptable | 10 |

Median:

Good

Candidate B:

| **Grade** | **Votes** |
| :-: | :-: |
| Excellent | 45 |
| Reject | 55 |

Median:

Reject

Winner:

Candidate A


## Why?

Majority Judgment rewards broadly accepted candidates.

It penalizes highly divisive candidates.


## Advantages

- Strong resistance to polarization

- Measures quality, not only preference

- Difficult to manipulate


## Best For

- Public consultations

- Candidate evaluation

- Participatory budgeting


# ✅ Approval Voting

## Principle

Approve every option you find acceptable.

Example:

Projects:

- Park

- Library

- Swimming Pool

Voter:

✓ Park

✓ Library

✗ Swimming Pool


## Results

| **Project** | **Approvals** |
| :-: | :-: |
| Park | 80 |
| Library | 70 |
| Pool | 40 |

Winner:

Park


## Advantages

- Very simple

- Finds compromise candidates

- Easy for large elections


# 🏆 Condorcet Voting

## Principle

Every option is compared against every other option.

Winner:

The option that defeats all others in pairwise comparisons.


## Example

Options:

- A

- B

- C

100 voters

### A vs B

A wins:

60–40

### A vs C

A wins:

55–45

### B vs C

B wins:

70–30

Result:

A defeats both B and C.

A is the Condorcet Winner.


# Why Condorcet Is Famous

Condorcet often finds the candidate preferred by the broadest majority.

Many democratic theorists consider it one of the most legitimate methods.


# Condorcet Cycle

Sometimes:

A beats B

B beats C

C beats A

No winner exists.

This is called:

Condorcet Paradox.


## Example

| **Preference Group** | **Voters** |
| :-: | :-: |
| A \> B \> C | 35 |
| B \> C \> A | 33 |
| C \> A \> B | 32 |

Results:

A beats B

B beats C

C beats A

No winner.


# Condorcet Variants

When no Condorcet winner exists, different methods resolve the cycle.


## Schulze Method

Default recommendation.

Uses strongest paths between candidates.

Advantages:

- Highly respected

- Widely used

- Robust

Used by:

- Debian Project

- Wikimedia elections

- Many open-source communities


## Ranked Pairs

Locks pairwise victories from strongest to weakest.

Advantages:

- Transparent

- Easy to audit


## Copeland

Score:

Wins − Losses

Simpler but less sophisticated.


## Minimax

Chooses candidate with smallest worst defeat.

Useful when avoiding strong opposition.


## Kemeny-Young

Mathematically elegant.

Often considered the theoretical optimum.

However:

- Computationally expensive

Best for small elections.


# 🥇 Borda Count

## Principle

Rank options.

Points are assigned.

Example with 4 candidates:

1st place = 3 points

2nd place = 2 points

3rd place = 1 point

4th place = 0 points


## Example

Voter ranking:

1. A

2. B

3. C

4. D

Points:

| **Candidate** | **Points** |
| :-: | :-: |
| A | 3 |
| B | 2 |
| C | 1 |
| D | 0 |

Sum all voters.

Highest total wins.


## Advantages

- Produces complete rankings

- Rewards broad support


## Limitations

A candidate preferred by a majority may lose.

Therefore:

Borda is consensus-oriented rather than majority-oriented.


# 📝 Ranked Choice Voting (RCV)

Also called:

Instant Runoff Voting.


## Principle

Rank candidates.

If nobody has a majority:

- Eliminate last candidate

- Transfer votes

- Repeat


## Example

Round 1

| **Candidate** | **Votes** |
| :-: | :-: |
| A | 40 |
| B | 35 |
| C | 25 |

C eliminated.

Votes transfer.

Round 2

| **Candidate** | **Votes** |
| :-: | :-: |
| A | 48 |
| B | 52 |

Winner:

B


## Advantages

- Simple

- Majority winner


## Limitations

Can eliminate consensus candidates early.


# ⚡ Quadratic Voting

## Principle

Participants receive voting credits.

The cost grows quadratically.

Example:

1 vote = 1 credit

2 votes = 4 credits

3 votes = 9 credits

4 votes = 16 credits


## Why?

Allows participants to express:

How strongly they care.


## Example

Citizen A strongly wants a park.

Citizen B slightly prefers a swimming pool.

Quadratic Voting reflects intensity.


## Best For

- Participatory budgeting

- Resource allocation

- Community priorities


# ⚖️ Weighted Voting

## Principle

Votes have different weights.

Example:

| **Member** | **Weight** |
| :-: | :-: |
| Citizen | 1 |
| Delegate | 5 |
| Representative | 20 |


## Uses

- Cooperatives

- Shareholder voting

- Federations


# 🔄 Phased Voting

## Principle

Several rounds.

Lowest options are removed between rounds.

Example:

Round 1:

10 projects

Round 2:

5 projects

Round 3:

2 finalists

Winner selected.


## Advantages

- Reduces complexity

- Works with large numbers of options


# 🎯 Which Method Should I Choose?

| **Goal** | **Recommended Method** |
| :-: | :-: |
| Petition | Binary |
| Assembly Vote | Ternary |
| Candidate Election | Condorcet |
| Consensus Candidate | Majority Judgment |
| Multiple Acceptable Options | Approval |
| Complete Ranking | Borda |
| Majority Winner | Ranked Choice |
| Budget Allocation | Quadratic |
| Shareholder Governance | Weighted Voting |
| Large Selection Process | Phased Voting |


# 📚 Recommended Defaults

For most Agora installations:

### Deliberation

- Ternary Support

- Majority Judgment

- Reactions

### Formal Decisions

- Condorcet (Schulze)

- Majority Judgment

- Approval Voting

These methods generally provide the best balance between legitimacy, fairness, and ease of participation.


# Final Thought

Different voting systems answer different democratic questions.

Binary voting asks:

> "Do you support this?"

Approval Voting asks:

> "Which options are acceptable?"

Majority Judgment asks:

> "How good is this option?"

Condorcet asks:

> "Which option would win against every alternative?"

Understanding these differences is essential to designing legitimate and trustworthy collective decisions.

