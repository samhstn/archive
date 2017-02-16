defmodule Autocomplete do
  import Plug.Conn

  def init(options), do: options

  def sending(conn, map, type) do
    {:ok, res} = map
    conn
    |> put_resp_content_type("text/" <> type)
    |> send_resp(200, res)
  end

  def word_getter(word) do
    {:ok, words} = File.read("words.txt")
    words
    |> String.split("\n")
    |> Enum.find(&(&1 == word))
  end

  def call(conn, _opts) do
    case conn.path_info do
      ["other"] ->
        sending(conn, {:ok, word_getter(conn.query_string)}, "plain")
      _ ->
        sending(conn, File.read("index.html"), "html")
    end
  end
end

