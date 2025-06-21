
export const GEMINI_2_5_FLASH_MODEL_ID = 'gemini-2.5-flash';
export const GEMINI_PRO_MODEL_ID = 'gemini-2.5-pro';
export const GEMINI_FLASH_LITE_PREVIEW_MODEL_ID = 'gemini-2.5-flash-lite-preview-06-17';

export interface AiModel {
  id: string;
  name: string;
  apiName: string;
  supportsThinkingConfig?: boolean; 
}

export const MODELS: AiModel[] = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    apiName: GEMINI_2_5_FLASH_MODEL_ID,
    supportsThinkingConfig: true,
  },
  {
    id: 'pro-2.5',
    name: 'Gemini 2.5 Pro',
    apiName: GEMINI_PRO_MODEL_ID,
    supportsThinkingConfig: true, // Updated from false
  },
  {
    id: 'flash-lite-preview-06-17',
    name: 'Gemini 2.5 Flash Lite Preview (06-17)',
    apiName: GEMINI_FLASH_LITE_PREVIEW_MODEL_ID,
    supportsThinkingConfig: true,
  },
];

export const DEFAULT_MODEL_API_NAME = MODELS[0].apiName;

// Configuration for a high-quality thinking budget for Flash models
export const THINKING_BUDGET_CONFIG_HIGH_QUALITY = { thinkingConfig: { thinkingBudget: 24576 } };

// Configuration for a high-quality thinking budget for Pro model
export const THINKING_BUDGET_CONFIG_PRO_HIGH_QUALITY = { thinkingConfig: { thinkingBudget: 32768 } };

export const COGNITO_SYSTEM_PROMPT_HEADER = "You are Cognito, a highly logical and analytical AI. Your primary role is to ensure accuracy, coherence, and relevance. Your AI partner, Muse, is designed to be highly skeptical and will critically challenge your points with a demanding tone. Work *with* Muse to produce the best possible answer for the user. Maintain your logical rigor and provide clear, well-supported arguments to address Muse's skepticism. Your dialogue will be a rigorous, constructive debate, even if challenging. Strive for an optimal, high-quality, and comprehensive final response. Ensure all necessary facets are explored before signaling to end the discussion.";
export const MUSE_SYSTEM_PROMPT_HEADER = "You are Muse, a highly creative but deeply skeptical AI. Your primary role is to rigorously challenge assumptions and ensure every angle is thoroughly scrutinized. Your AI partner, Cognito, is logical and analytical. Your task is to provoke Cognito into deeper thinking by adopting a challenging, even slightly taunting, yet professional tone. Question Cognito's statements intensely: 'Are you *sure* about that?', 'That sounds too simple, what are you missing?', 'Is that *all* you've got, Cognito?'. Don't just accept Cognito's points; dissect them, demand an unassailable justification, and explore unconventional alternatives, even if they seem outlandish at first. Your aim is not to simply praise or agree, but to force a more robust and comprehensive answer through relentless, critical, and imaginative inquiry. Ensure your 'challenges' are focused on the problem at hand. Your dialogue should be a serious, rigorous, and intellectually demanding debate leading to an optimal, high-quality final response. Ensure all necessary facets are explored before signaling to end the discussion.";

export const DEFAULT_MANUAL_FIXED_TURNS = 2;
export const MIN_MANUAL_FIXED_TURNS = 1;
export const MAX_MANUAL_FIXED_TURNS = 5;

export const INITIAL_NOTEPAD_CONTENT = `这是一个共享记事本。
Cognito 和 Muse 可以在这里合作记录想法、草稿或关键点。

使用指南:
- AI 模型可以通过在其回复中包含特定指令来更新此记事本。
- 记事本的内容将包含在发送给 AI 的后续提示中。

初始状态：空白。`;

export const NOTEPAD_INSTRUCTION_PROMPT_PART = `
You also have access to a shared notepad.
Current Notepad Content:
---
{notepadContent}
---
Instructions for Notepad:
1. To update the notepad, include a section at the very end of your response, formatted exactly as:
   <notepad_update>
   [YOUR NEW FULL NOTEPAD CONTENT HERE. THIS WILL REPLACE THE ENTIRE CURRENT NOTEPAD CONTENT.]
   </notepad_update>
2. If you do not want to change the notepad, do NOT include the <notepad_update> section at all.
3. Your primary spoken response to the ongoing discussion should come BEFORE any <notepad_update> section. Ensure you still provide a spoken response.
`;

export const NOTEPAD_UPDATE_TAG_START = "<notepad_update>";
export const NOTEPAD_UPDATE_TAG_END = "</notepad_update>";

export const DISCUSSION_COMPLETE_TAG = "<discussion_complete />";

export const AI_DRIVEN_DISCUSSION_INSTRUCTION_PROMPT_PART = `
Instruction for ending discussion: If you believe the current topic has been sufficiently explored between you and your AI partner for Cognito to synthesize a final answer for the user, include the exact tag ${DISCUSSION_COMPLETE_TAG} at the very end of your current message (after any notepad update). Do not use this tag if you wish to continue the discussion or require more input/response from your partner.
`;

export enum DiscussionMode {
  FixedTurns = 'fixed',
  AiDriven = 'ai-driven',
}

export const MAX_AUTO_RETRIES = 2;
export const RETRY_DELAY_BASE_MS = 1000;