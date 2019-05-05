# Archive

I have produced a lot of repositories. Most of which I will never look at again.

When the amount of repos we have is over 100, we should probably look to tidy them up - otherwise it looks sloppy.

I decided to push all of them into this `Archive` repository, while keeping my git commit history for each of them.

Any repository which I no longer wish to work on can be added to this collection.

### Getting started

1. Ensure you have installed [jmespath](https://github.com/jmespath/jp).

2. Ensure you have a github pa token with get and delete repo access (call it `GITHUB_PA_TOKEN`).

3. Run the `get_repos` command passing in the relevant github username:

```bash
./get_repos
```

This will create a `repos.txt` file. Edit this to include the repos you wish to archive.

4. Add repos to this archive with the `archive_repos` command:

```bash
./archive_repos
```

5. You can delete the archived repos from github by running:

```bash
./delete_repos
```

This will delete all repos which are in our `archive` directory.
