import inquirer from "inquirer";
import express from 'express';
import { QueryResult } from 'pg';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
});

const connectToDb = async () => {
    try {
      await pool.connect();
      console.log('Connected to the database.');
    } catch (err) {
      console.error('Error connecting to database:', err);
      process.exit(1);
    }
};

await connectToDb();

prompt