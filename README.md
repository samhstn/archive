# Archive

I had a lot of github repositories.

When this amount is over 100, one should probably look to tidy them up.

I decided to push all of them into this `Archive` repository, while keeping my git commit history for each of them.

Any repository which I no longer wish to work on can be added to this collection.

### Getting started

1. Ensure you have installed [jmespath](https://github.com/jmespath/jp).

2. Run the `get_repos` command passing in the relevant github username:

```bash
./get_repos
```

This will create a `repos.txt` file. Edit this to include the repos you wish to archive.

3. Add repos to this archive with the `archive_repos` command:

```bash
./archive_repos
```
