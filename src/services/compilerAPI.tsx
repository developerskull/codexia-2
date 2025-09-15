type JudgeResponse = {
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  message?: string;
  status: {
    id: number;
    description: string;
  };
};

type ExecutionResult = {
  output: string;
  error: string;
  status: string;
};

export const executeCode = async (sourceCode: string, languageId: number): Promise<ExecutionResult> => {
  try {
    const submitResponse = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY!,
        'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST!,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        source_code: btoa(sourceCode),
        language_id: languageId,
        stdin: '',
        expected_output: null,
        cpu_time_limit: 5,
        memory_limit: 256000,
        compiler_options: '', // Add compiler options if needed
      })
    });

    if (!submitResponse.ok) {
      throw new Error(`API Error: ${submitResponse.status}`);
    }

    const resultData: JudgeResponse = await submitResponse.json();
    
    // Enhanced error handling
    if (resultData.status?.id >= 6) { // Status IDs 6+ indicate various error states
      return {
        output: '',
        error: atob(resultData.stderr || resultData.compile_output || resultData.message || ''),
        status: resultData.status.description
      };
    }

    return {
      output: resultData.stdout ? atob(resultData.stdout) : '',
      error: '',
      status: 'Success'
    };

  } catch (error) {
    console.error('Code execution error:', error);
    return {
      output: '',
      error: `Execution Error: ${(error as Error).message}`,
      status: 'Error'
    };
  }
};