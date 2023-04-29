#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

bool can_form_word(const char *word, const char *letters)
{
    int letters_count[26] = {0};
    int word_len = strlen(word);

    for (int i = 0; i < 6; i++)
    {
        letters_count[letters[i] - 'a']++;
    }

    for (int i = 0; i < word_len; i++)
    {
        if (--letters_count[word[i] - 'a'] < 0)
        {
            return false;
        }
    }

    return true;
}

int comparator(const void *a, const void *b)
{
    return strlen(*(const char **)b) - strlen(*(const char **)a);
}

int main()
{
    char letters[6];
    printf("Enter the 6 letters: ");
    scanf("%6s", letters);

    if (strlen(letters) != 6)
    {
        printf("Invalid input\n");
        return -1;
    }

    for (int i = 0; i < 6; i++)
    {
        letters[i] = tolower(letters[i]);
    }

    FILE *file = fopen("words.txt", "r");
    if (file == NULL)
    {
        perror("Error opening file");
        return -1;
    }

    char word[256];
    char **results = NULL;
    int results_count = 0;

    while (fgets(word, sizeof(word), file) != NULL)
    {
        word[strcspn(word, "\n")] = '\0';

        if (can_form_word(word, letters))
        {
            results_count++;
            results = realloc(results, results_count * sizeof(char *));
            results[results_count - 1] = strdup(word);
        }
    }

    fclose(file);

    qsort(results, results_count, sizeof(char *), comparator);

    int last_word_len = 0;
    for (int i = 0; i < results_count; i++)
    {
        printf("%s ", results[i]);
        free(results[i]);
    }

    free(results);

    return 0;
}
