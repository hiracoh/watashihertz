'use client';

import { useState } from 'react';

export default function ContentDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="content-dropdown"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') setOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false);
      }}
    >
      <button
        type="button"
        className="content-dropdown-trigger"
        aria-expanded={open}
        aria-controls="content-dropdown-links"
        onClick={() => setOpen((value) => !value)}
      >
        コンテンツ <span aria-hidden="true" className="content-dropdown-chevron">⌄</span>
      </button>
      {open && (
        <div className="content-dropdown-list" id="content-dropdown-links">
          <a href="/content">記事</a>
          <a href="/encyclopedias">図鑑</a>
          <a href="/cards">カード</a>
        </div>
      )}
    </div>
  );
}
