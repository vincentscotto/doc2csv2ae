# doc2csv2ae
This converts a specifically formatted word doc to a csv, that you can then use `csv2ae.jsx` to import that into after effects.

## getting started
1) `git clone git@github.com:vincentscotto/doc2csv2ae.git`

2) `npm install`

3) `npm start`

following the directions on the page and the csv that is output should look like so: 

```
ID,Eyebrow copy,Body copy 1,Body copy 2,Footnote copy
Frame 1,This is the eyebrow copy content for Frame 1. This is the eyebrow copy content for Frame 1.This is the eyebrow copy content for Frame 1.This is the eyebrow copy content for Frame 1. This is the eyebrow copy content for Frame 1.,This is the body copy 1 content for Frame 1.,This is the body copy 2 content for Frame 1.,This is the footnote copy content for Frame 1.
Frame 2,This is the eyebrow copy content for Frame 2.,This is the body copy 1 content for Frame 2.,This is the body copy 2 content for Frame 2.,This is the footnote copy content for Frame 2.
Frame 3,This is the eyebrow copy content for Frame 3.,This is the body copy 1 content for Frame 3.,This is the body copy 2 content for Frame 3.,This is the footnote copy content for Frame 3.
```


## properly formatting word docs

the word docs **MUST** be structured correctly. see **template.docx** for an example.

each intended composition must start with **Frame #** and end with **=== PAGE TITLE ===**

Basically each frame must be labeled like the following:

```
Frame 1

Eyebrow copy: This is the eyebrow copy content for Frame 1. This is the eyebrow copy content for Frame 1.This is the eyebrow copy content for Frame 1.This is the eyebrow copy content for Frame 1. This is the eyebrow copy content for Frame 1.
Body copy 1: This is the body copy 1 content for Frame 1.
Body copy 2: This is the body copy 2 content for Frame 1.
Footnote copy: This is the footnote copy content for Frame 1.

=== PAGE TITLE ===
```

the above would be the first frame. if you wanted to add another, it would work like so:

```
Frame 1

Eyebrow copy: This is the eyebrow copy content for Frame 1. This is the eyebrow copy content for Frame 1.This is the eyebrow copy content for Frame 1.This is the eyebrow copy content for Frame 1. This is the eyebrow copy content for Frame 1.
Body copy 1: This is the body copy 1 content for Frame 1.
Body copy 2: This is the body copy 2 content for Frame 1.
Footnote copy: This is the footnote copy content for Frame 1.

=== PAGE TITLE ===

Frame 2 Title

Eyebrow copy: This is the eyebrow copy content for Frame 2.
Body copy 1: This is the body copy 1 content for Frame 2.
Body copy 2: This is the body copy 2 content for Frame 2.
Footnote copy: This is the footnote copy content for Frame 2.

=== PAGE TITLE ===
```

and so on and on and on...





