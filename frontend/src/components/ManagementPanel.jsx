import { useState } from "react";
import {
  searchBySpecies,
  deleteRecord,
  updateRecordTags,
} from "../services/api";

function ManagementPanel() {
  const [species, setSpecies] = useState("");
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");

  async function handleSearch() {
    if (!species.trim()) return;

    setMessage("Searching...");

    try {
      const data = await searchBySpecies(species.trim());
      setRecords(data.results || []);
      setMessage(`${data.count} record(s) found.`);
    } catch (error) {
      setMessage("Search failed.");
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

  async function handleEditTags(fileId) {
    const adminKey = prompt("Enter admin key:");
    if (!adminKey) return;

    const tagName = prompt("Enter tag name:");
    if (!tagName) return;

    const operation = prompt("Enter operation: 1 to add, 0 to remove");
    if (operation !== "1" && operation !== "0") return;

    try {
      await updateRecordTags(
        fileId,
        {
          [tagName]: Number(operation),
        },
        adminKey
      );

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

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleEditTags(record.file_id)}
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