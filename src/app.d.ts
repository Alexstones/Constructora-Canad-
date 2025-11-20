declare global {
  namespace App {
    // si después quieres usar locals, los definimos
    interface Locals {
      user?: import('@supabase/supabase-js').User | null;
    }
  }
}

export {};
