"use client";

import { useAuth } from "@/contexts/AuthContext";
import { uploadAPI } from "@/lib/api";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const { token } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  if (!editor) {
    return null;
  }

  const handleImageUpload = async (file: File) => {
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      const response = await uploadAPI.uploadImage(token, file, "blogs");

      if (response.success && response.data?.url) {
        editor.chain().focus().setImage({ src: response.data.url }).run();
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload image";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const addImageFromFile = () => {
    fileInputRef.current?.click();
  };

  const addImageFromURL = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const buttonClass = (isActive = false) =>
    `p-2 rounded hover:bg-gray-700 transition-colors ${
      isActive ? "bg-gray-700 text-purple-400" : "text-gray-400"
    }`;

  return (
    <div className="border-b border-gray-600 p-2 flex flex-wrap gap-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
        type="button"
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
        type="button"
        title="Italic"
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={buttonClass(editor.isActive("code"))}
        type="button"
        title="Code"
      >
        <Code size={18} />
      </button>

      <div className="w-px h-6 bg-gray-600 mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 1 }))}
        type="button"
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 2 }))}
        type="button"
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 3 }))}
        type="button"
        title="Heading 3"
      >
        <Heading3 size={18} />
      </button>

      <div className="w-px h-6 bg-gray-600 mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive("bulletList"))}
        type="button"
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClass(editor.isActive("orderedList"))}
        type="button"
        title="Numbered List"
      >
        <ListOrdered size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={buttonClass(editor.isActive("blockquote"))}
        type="button"
        title="Quote"
      >
        <Quote size={18} />
      </button>

      <div className="w-px h-6 bg-gray-600 mx-1" />

      <button
        onClick={addLink}
        className={buttonClass(editor.isActive("link"))}
        type="button"
        title="Add Link"
      >
        <LinkIcon size={18} />
      </button>

      <div className="w-px h-6 bg-gray-600 mx-1" />

      <button
        onClick={addImageFromFile}
        className={buttonClass()}
        type="button"
        title="Upload Image"
        disabled={uploading}
      >
        {uploading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-300" />
        ) : (
          <Upload size={18} />
        )}
      </button>
      <button
        onClick={addImageFromURL}
        className={buttonClass()}
        type="button"
        title="Add Image from URL"
      >
        <ImageIcon size={18} />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
        }}
        className="hidden"
      />

      <div className="w-px h-6 bg-gray-600 mx-1" />

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={buttonClass()}
        type="button"
        title="Undo"
      >
        <Undo size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={buttonClass()}
        type="button"
        title="Redo"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing your blog content...",
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: false,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-purple-400 hover:text-purple-300 underline",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-lg max-w-none focus:outline-none min-h-[400px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="bg-gray-700 border border-gray-600 rounded-lg overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
