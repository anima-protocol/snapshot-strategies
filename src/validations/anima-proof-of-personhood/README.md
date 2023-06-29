# Anima Proof of Personhood Validation Strategy

This repository provides a proof-of-personhood validation strategy for Snapshot. The implementation use the [Proof of Personhood API](https://pop.anima.io/) to validate whether a user is authorized to vote on a proposal based on his humanity and his uniqueness.

## Prerequisites

Before using this code, ensure that you have the following information stored in a `.env` file at the project root:

- `ANIMA_POP_API_KEY=<your-api-key>`

## Overview

This validation implementation uses the Proof of Personhood API to check whether a user has a valid PoP.
