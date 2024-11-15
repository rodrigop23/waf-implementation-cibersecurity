"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash } from "lucide-react";

interface IComment {
  id: number;
  content: string;
}

export default function Component() {
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [comment, setComment] = useState("");
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/comments");

      const data = await response.json();

      if (!data.ok) {
        return toast("Error al obtener los comentarios");
      }

      setComments(data.comments);
    })();
  }, [trigger]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });

    const data = await response.json();

    if (!data.ok) {
      return toast("No se pudo enviar el comentario");
    }

    toast(data.message);

    setComment("");

    setTrigger((prev) => !prev);
  };

  const deleteAllComments = async () => {
    const response = await fetch("/api/comments", {
      method: "DELETE",
    });

    const data = await response.json();

    if (!data.ok) {
      return toast("No se pudo eliminar los comentarios");
    }

    setTrigger((prev) => !prev);

    toast(data.message);
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Formulario de Comentarios (Vulnerable a XSS)
      </h1>
      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Comentario
          </label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row items-center justify-between">
          <Button type="submit">Enviar Comentario</Button>

          <Button
            type="button"
            variant="destructive"
            onClick={deleteAllComments}
          >
            <Trash /> Eliminar Todos
          </Button>
        </div>
      </form>
      <div>
        <h2 className="mb-2 text-xl font-semibold">Comentarios:</h2>
        <ul className="space-y-2">
          {comments?.map((c) => (
            <li
              key={c.id}
              dangerouslySetInnerHTML={{ __html: c.content }}
              className="rounded bg-gray-100 p-2"
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
