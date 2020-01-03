# Mac Shell 꾸미기 (iTerm2 + Oh My Zsh)

> 아래 두 글을 읽고 메모한 내용입니다.
>
> - [Oh My ZSH+ iTerm2로 터미널을 더 강력하게 - 해리의 유목코딩 | Medium](https://medium.com/harrythegreat/oh-my-zsh-iterm2로-터미널을-더-강력하게-a105f2c01bec)
> - [Configuration of a beautiful (efficient) terminal and prompt on OSX in 7minutes - Clovis | Medium](https://medium.com/@Clovis_app/configuration-of-a-beautiful-efficient-terminal-and-prompt-on-osx-in-7-minutes-827c29391961)

MacOS의 기본 쉘이 bash에서 zsh로 바뀌었t습니다. `Terminal` 앱을 켤 때마다 `zsh` 관련 문구가 표시됩니다. 이 참에 쉘을 멋지게 바꾸기로 했습니다.

원래는 [Oh My ZSH+ iTerm2로 터미널을 더 강력하게 - 해리의 유목코딩 | Medium](https://medium.com/harrythegreat/oh-my-zsh-iterm2로-터미널을-더-강력하게-a105f2c01bec) 글을 참고해서 작성했었습니다. 그런데 얼마 전 온라인 TDD 강의를 보다가 명령어 우측에 시간, history 번호 등이 표시되는 스킨을 보고 같은 스킨을 사용하고 싶어 뒤적거리다가 결국 찾아냈습니다.

[Configuration of a beautiful (efficient) terminal and prompt on OSX in 7minutes - Clovis | Medium](https://medium.com/@Clovis_app/configuration-of-a-beautiful-efficient-terminal-and-prompt-on-osx-in-7-minutes-827c29391961) 글을 따라하면 아래와 같은 결과를 얻을 수 있습니다. 이미지에 보이는 것 외에 내용에 포함된 추가 기능 설정들도 있습니다:

- 명령어 추천
- Syntax Highlighting
- ...

![img](/Users/heedo/Documents/shell-settings.png)

나중에 다시 설정할 때를 대비해 내가 사용한 항목과 관련된 내용들만 순서대로 정리했습니다.

설치 명령어:

```bash
# iTerm2
$ brew cask install iterm2
# 내비게이션
$ brew install zsh zsh-completions
# oh-my-zsh
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# iTerm Theme
$ git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
# oh-my-zsh 명령어 추천
$ git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
# Syntax Highlighting
$ brew install zsh-syntax-highlighting
```

iTerm2 color preset: **Dracula**

- https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Dracula.itermcolors
- 이후 iTerm2 - Preferences - Profiles - Color Presets... - Import - Dracula 선택

font: **Hack**

- https://github.com/powerline/fonts
- 저장소 다운로드 후 해당 폴더에서 `./install.sh`
- 이후 iTerm2 - Preferences - Profiles - Text - Font - Hack 선택

**zsh** settings:

```bash
## ~/.zshrc
## MODIFIED ZSH_THEME
ZSH_THEME="powerlevel9k/powerlevel9k"

## ADDED AT BOTTOM
# powerlevel9k settings
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir rbenv vcs)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status root_indicator background_jobs history time)
POWERLEVEL9K_PROMPT_ON_NEWLINE=true
POWERLEVEL9K_PROMPT_ADD_NEWLINE=true
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# Add a space in the first prompt
POWERLEVEL9K_MULTILINE_FIRST_PROMPT_PREFIX="%f"
# Visual customisation of the second prompt line
local user_symbol="$"
if [[ $(print -P "%#") =~ "#" ]]; then
    user_symbol = "#"
fi
POWERLEVEL9K_MULTILINE_LAST_PROMPT_PREFIX="%{%B%F{black}%K{yellow}%} $user_symbol%{%b%f%k%F{yellow}%} %{%f%}"
```

**Visual Studio Code** settings:

- `command` + `,` 후 우측 상단의 문서 모양 아이콘을 누르면 아래처럼 json 형태로 작성할 수 있습니다.

```json
// settings.json
{
    "terminal.external.osxExec": "iTerm.app",
    "terminal.integrated.shell.osx": "/bin/zsh",
    "terminal.integrated.fontFamily": "Hack"
}
```

