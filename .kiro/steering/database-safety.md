---
inclusion: auto
---

# Database Safety - CRITICAL RULES

## ⚠️ NEVER RESET THE DATABASE

**THIS IS A PRODUCTION DATABASE. ANY DATA LOSS IS CATASTROPHIC.**

### Prisma Migration Rules

1. **NEVER accept database reset** when running `npx prisma migrate dev`
2. **NEVER use** `npx prisma migrate reset` 
3. **NEVER use** `npx prisma db push --force-reset`
4. **NEVER confirm** any prompt that mentions "reset", "drop", or "delete all data"

### Safe Migration Commands

✅ **ALWAYS use these commands:**
```bash
# For development (creates migration without reset)
npx prisma migrate dev --name description --create-only

# Review the migration SQL file before applying
# Then apply with:
npx prisma migrate deploy

# For production
npx prisma migrate deploy
```

❌ **NEVER use these:**
```bash
npx prisma migrate reset          # DELETES ALL DATA
npx prisma db push --force-reset  # DELETES ALL DATA
npx prisma migrate dev            # Can prompt for reset - DANGEROUS
```

### If Migration Drift is Detected

When Prisma detects drift (schema doesn't match migrations):

1. **STOP immediately** - do NOT accept reset
2. **Create a backup branch** in Neon Console first
3. **Review the drift** - understand what changed
4. **Create a new migration** that resolves the drift without data loss
5. **Test in a separate branch** before applying to production

### Database Connection

- **Production database** is hosted on Neon (Vercel)
- Connection string in `DATABASE_URL` environment variable
- **This is the SAME database for development and production**
- Any changes affect live data immediately

### Backup Strategy

- Neon provides automatic backups
- Use **Point-in-Time Recovery** via Neon Console
- Create manual backup branches before risky operations
- Keep backup connection string temporarily in `BACKUP_DATABASE_URL` only when restoring

### Emergency Recovery

If data is accidentally deleted:

1. Access Neon Console: https://console.neon.tech
2. Go to **Branches** → **Create branch**
3. Select **Point in time** before the incident
4. Use the restore script: `npm run restore-backup`
5. Set `BACKUP_DATABASE_URL` to the backup branch connection string
6. Run restoration, then remove the variable

### Schema Changes Workflow

1. **Plan the change** - document what needs to change
2. **Create migration file** - use `--create-only` flag
3. **Review SQL** - check the generated migration
4. **Test locally** - ensure no data loss
5. **Apply migration** - use `migrate deploy`
6. **Verify data** - check that existing data is intact

## Remember

**DATA LOSS IS PERMANENT. ALWAYS BE CAUTIOUS WITH DATABASE OPERATIONS.**

When in doubt:
- Create a backup branch first
- Ask the user before proceeding
- Never assume it's safe to reset
