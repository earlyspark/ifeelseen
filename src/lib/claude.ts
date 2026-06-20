// Single source of truth for the Claude model used by the API routes
// (card reflection generation and career quiz scoring).
//
// When Anthropic deprecates this model, update it HERE — both routes import
// from this one place, so a migration is a one-line change. Anthropic
// announces retirements months ahead via email and a public deprecations
// page; a retired model returns a 404 (not_found_error) at request time.
export const CLAUDE_MODEL = "claude-sonnet-4-6";
