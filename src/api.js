export async function analyzeResume(resumeFile, jobDescription) {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("jd", jobDescription);

  const response = await fetch(
    "https://credexa-backend.onrender.com/api/analyze",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze resume");
  }

  return response.json();
}
