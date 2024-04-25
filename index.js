import { Client, IntentsBitField, EmbedBuilder } from 'discord.js';
import Dotenv from 'dotenv'

Dotenv.config()

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages]
});

client.once('ready', () => {
  console.log('Bot connected!');

  const oneMinute = 60000;
  setInterval(sendTimeMessage, oneMinute);
})

function sendTimeMessage() {
  const textChannel = client.channels.cache.get(
    process.env.time_text_channel_id,
  );

  if (textChannel) {
    const currentTime = new Date();
    const formattedDateTime = getFormattedDate(currentTime);

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Current UTC Time")
      .setDescription(`The current UTC time is ${formattedDateTime}`)
      .setTimestamp(currentTime);

    textChannel.send({ embeds: [embed] });
  } else {
    console.error("Text channel not found or not a text channel");
  }
}

function getFormattedDate(currentTime) {
  const year = currentTime.getUTCFullYear();
  const month = (currentTime.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = currentTime.getUTCDate().toString().padStart(2, "0");
  const time = convertTime(currentTime.toUTCString());

  return `${year}/${month}/${day} ${time} UTC`;
}

function convertTime(utcTime) {
  const date = new Date(utcTime);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

client.login(process.env.token);

import express from 'express';
const app = express();

// test
app.listen( 3000, () => {
  console.log(`Express server listening on port ${process.env.PORT || 3000}`);
});
