export async function fetchPromptRecommendation(projectIdea) {
  try {
    const res = await fetch('http://localhost:5174/api/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea: projectIdea }),
    });

    if (!res.ok) {
      console.error('[前端] 接口响应错误：', res.status);
      throw new Error('服务器响应异常');
    }

    const data = await res.json();
    console.log('🟡 前端收到数据 =', data);

    return {
      title: data.title ?? '',
      prompt: data.prompt ?? '未返回推荐内容',
    };
  } catch (err) {
    console.error('[前端] 请求失败：', err);
    return {
      title: '',
      prompt: '生成失败，请检查网络或服务器状态',
    };
  }
}
