import openai, { OpenAI } from 'openai';
import React from 'react';

const InputDataContent = async () => {

 /* const openai = new OpenAI({ apiKey: 'sk-proj-DBt6rcaGuTwUrRHGVcrAT3BlbkFJUX7VbS6S9ObRnKFASaUs', dangerouslyAllowBrowser: true });

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log('jawaban'+completion.choices[0]);*/


  return (
    <div>
      <h2>Input Data</h2>
      {/* Isi dengan elemen form input Anda */}
      <form>
        <label>
          Input Data:
          <input type="text" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputDataContent;
