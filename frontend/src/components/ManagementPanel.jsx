import { useState } from "react";
import {
  searchBySpecies,
  deleteRecord,
  updateRecordTags,
  getAllRecords,
  searchByTagCounts,
  getOriginalByThumbnail,
} from "../services/api";

function ManagementPanel() {
  const [species, setSpecies] = useState("");
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");

  const [tagQuery, setTagQuery] = useState('{"dingo": 1}');
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailResult, setThumbnailResult] = useState("");

  async function handleSearch() {
    setMessage("Searching...");

    try {
      const data = species.trim()
        ? await searchBySpecies(species.trim())
        : await getAllRecords();

      setRecords(data.results || []);
      setMessage(`${data.count} record(s) found.`);
    } catch (error) {
      setMessage("Search failed.");
    }
  }

  async function handleAdvancedTagSearch() {
    setMessage("Searching by tag counts...");

    try {
      const parsedTags = JSON.parse(tagQuery);
      const data = await searchByTagCounts(parsedTags);

      setRecords(data.results || []);
      setMessage(`${data.count} record(s) found by tag-count query.`);
    } catch (error) {
      setMessage("Advanced tag query failed. Please check JSON format.");
    }
  }

  async function handleThumbnailLookup() {
    if (!thumbnailUrl.trim()) return;

    setMessage("Looking up thumbnail URL...");

    try {
      const data = await getOriginalByThumbnail(thumbnailUrl.trim());

      if (data.found) {
        setThumbnailResult(data.original_url);
        setMessage("Original file URL found.");
      } else {
        setThumbnailResult("");
        setMessage("No matching original file found.");
      }
    } catch (error) {
      setMessage("Thumbnail lookup failed.");
    }
  }

  async function handleDelete(fileId) {
    const adminKey = prompt("Enter admin key:");

    if (!adminKey) return;

    try {
      await deleteRecord(fileId, adminKey);
      setRecords(records.filter((record) => record.file_id !== fileId));
      setMessage("Record deleted.");
    } catch (error) {
      setMessage("Delete failed. Admin key may be wrong.");
    }
  }

  async function handleEditTags(record) {
    const adminKey = prompt("Enter admin key:");
    if (!adminKey) return;

    const currentTags = Object.keys(record.tags || {});

    const input = prompt(
      "Edit tags. Use comma-separated names:",
      currentTags.join(", ")
    );

    if (input === null) return;

    const newTags = input
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const tagOperations = {};

    currentTags.forEach((tag) => {
      if (!newTags.includes(tag)) {
        tagOperations[tag] = 0;
      }
    });

    newTags.forEach((tag) => {
      if (!currentTags.includes(tag)) {
        tagOperations[tag] = 1;
      }
    });

    if (Object.keys(tagOperations).length === 0) {
      setMessage("No tag changes detected.");
      return;
    }

    try {
      await updateRecordTags(record.file_id, tagOperations, adminKey);
      setMessage("Tags updated. Search again to refresh results.");
    } catch (error) {
      setMessage("Tag update failed. Admin key may be wrong.");
    }
  }

  return (
    <section className="mt-10 rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-xl">
      <h3 className="text-2xl font-bold">Wildlife Records</h3>
      <p className="mt-2 text-sm text-slate-400">
        Search previous observations by species. Edit and delete actions require
        an admin key.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          value={species}
          onChange={(event) => setSpecies(event.target.value)}
          placeholder="e.g. australian brushturkey"
          className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-400"
        />

        <button
          onClick={handleSearch}
          className="rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-300"
        >
          Search
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
        <h4 className="font-semibold">Advanced Tag Query</h4>
        <p className="mt-1 text-sm text-slate-400">
          Use JSON format for tag count queries. Example: {"{"}"dingo": 1, "kangaroo": 2{"}"}
        </p>

        <textarea
          value={tagQuery}
          onChange={(event) => setTagQuery(event.target.value)}
          className="mt-3 min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400"
        />

        <button
          onClick={handleAdvancedTagSearch}
          className="mt-3 rounded-xl border border-emerald-400 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-400/10"
        >
          Search by Tag Counts
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
        <h4 className="font-semibold">Thumbnail URL Lookup</h4>
        <p className="mt-1 text-sm text-slate-400">
          Enter a stored thumbnail URL to retrieve its original file URL.
        </p>

        <input
          value={thumbnailUrl}
          onChange={(event) => setThumbnailUrl(event.target.value)}
          placeholder="gs://bucket/thumbnails/thumbnail_example.jpg"
          className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400"
        />

        <button
          onClick={handleThumbnailLookup}
          className="mt-3 rounded-xl border border-sky-400 px-4 py-2 text-sm text-sky-300 hover:bg-sky-400/10"
        >
          Get Original URL
        </button>

        {thumbnailResult && (
          <p className="mt-3 break-all text-sm text-sky-300">
            Original URL: {thumbnailResult}
          </p>
        )}
      </div>

      {message && <p className="mt-4 text-sm text-emerald-300">{message}</p>}

      <div className="mt-6 space-y-4">
        {records.map((record) => (
          <div
            key={record.file_id}
            className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4"
          >
            <p className="font-semibold">
              {Object.keys(record.tags || {}).join(", ") || "No tags"}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              File ID: {record.file_id}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Type: {record.file_type} · Created: {record.created_at}
            </p>

            <p className="mt-1 break-all text-sm text-slate-500">
              Original: {record.original_url}
            </p>

            <p className="mt-1 break-all text-sm text-slate-500">
              Thumbnail: {record.thumbnail_url}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleEditTags(record)}
                className="rounded-lg border border-sky-400 px-4 py-2 text-sm text-sky-300 hover:bg-sky-400/10"
              >
                Edit Tags
              </button>

              <button
                onClick={() => handleDelete(record.file_id)}
                className="rounded-lg border border-red-400 px-4 py-2 text-sm text-red-300 hover:bg-red-400/10"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ManagementPanel;