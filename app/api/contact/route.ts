// Compatibility path: same durable application contract; never send mail inline.
import { applicationPost } from "@/lib/applications/http";

export const runtime = "nodejs";
export const POST = applicationPost;
