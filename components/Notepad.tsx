import React, { useState, useMemo } from 'react';
import { MessageSender } from '../types';
import { FileText, Edit3, Eye, Code, Copy, Check } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface NotepadProps {
  content: string;
  lastUpdatedBy?: MessageSender | null;
  isLoading: boolean;
}

const Notepad: React.FC<NotepadProps> = ({ content, lastUpdatedBy, isLoading }) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getSenderColor = (sender?: MessageSender | null) => {
    if (sender === MessageSender.Cognito) return 'text-green-600'; // Darker green for light theme
    if (sender === MessageSender.Muse) return 'text-purple-600'; // Darker purple for light theme
    return 'text-gray-600'; // Darker gray for light theme
  };

  const processedHtml = useMemo(() => {
    if (isPreviewMode) {
      const rawHtml = marked.parse(content) as string;
      // DOMPurify.sanitize is used to prevent XSS attacks.
      // The 'markdown-preview' class styles are defined globally in index.html for light theme.
      return DOMPurify.sanitize(rawHtml);
    }
    return '';
  }, [content, isPreviewMode]);

  const handleCopyNotepad = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('无法复制记事本内容: ', err);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 border-l border-gray-300">
      <header className="p-3 border-b border-gray-300 flex items-center justify-between bg-gray-100">
        <div className="flex items-center">
          <FileText size={20} className="mr-2 text-sky-600" />
          <h2 className="text-lg font-semibold text-sky-700">记事本</h2>
        </div>
        <div className="flex items-center space-x-2">
          {isLoading && <span className="text-xs text-gray-500 italic">AI 思考中...</span>}
          <button
            onClick={handleCopyNotepad}
            className="p-1.5 text-gray-500 hover:text-sky-600 transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-sky-500 rounded-md"
            title={isCopied ? "已复制!" : "复制记事本内容"}
            aria-label={isCopied ? "已复制记事本内容到剪贴板" : "复制记事本内容"}
          >
            {isCopied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="p-1.5 text-gray-500 hover:text-sky-600 transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-sky-500 rounded-md"
            title={isPreviewMode ? "查看原始内容" : "预览 Markdown"}
            aria-label={isPreviewMode ? "Switch to raw text view" : "Switch to Markdown preview"}
          >
            {isPreviewMode ? <Code size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </header>
      <div className="flex-grow overflow-y-auto relative bg-white">
        {isPreviewMode ? (
          <div
            className="markdown-preview" // Styles are defined in index.html for light theme
            dangerouslySetInnerHTML={{ __html: processedHtml }}
            aria-label="Markdown 预览"
          />
        ) : (
          <textarea
            readOnly
            value={content}
            className="w-full h-full p-3 bg-white text-gray-800 resize-none border-none focus:ring-0 font-mono text-sm leading-relaxed"
            aria-label="共享记事本内容 (原始内容)"
          />
        )}
      </div>
      <footer className="p-2 border-t border-gray-300 text-xs text-gray-600 bg-gray-100">
        {lastUpdatedBy ? (
          <div className="flex items-center">
            <Edit3 size={14} className={`mr-1.5 ${getSenderColor(lastUpdatedBy)}`} />
            最后更新者: <span className={`font-medium ml-1 ${getSenderColor(lastUpdatedBy)}`}>{lastUpdatedBy}</span>
          </div>
        ) : (
          <span>记事本内容未被 AI 修改过。</span>
        )}
      </footer>
    </div>
  );
};

export default Notepad;